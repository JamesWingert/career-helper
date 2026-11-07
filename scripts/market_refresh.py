#!/usr/bin/env python3
"""Append-only FRED/Indeed collector and completeness gate for the SWE dashboard."""
import csv, datetime as dt, io, json, os, pathlib, urllib.request
ROOT=pathlib.Path(__file__).resolve().parents[1]
OUT=ROOT/"data"/"market-snapshots"/"automated"
SERIES={"software":"IHLIDXUSTPSOFTDEVE","overall":"IHLIDXUS","it_operations":"IHLIDXUSTPITOPHE"}
REQUIRED=["indeed_fred","linkedin_nyc","nyc_explicit_yoe","trueup","lightcast_public","revelio","stanford","bls","ny_warn","sec_company","metr","coding_evaluations"]
def fetch(series):
    url=f"https://fred.stlouisfed.org/graph/fredgraph.csv?id={series}"
    req=urllib.request.Request(url,headers={"User-Agent":"career-helper-market-monitor/1.0"})
    with urllib.request.urlopen(req,timeout=35) as response:
        rows=list(csv.DictReader(io.StringIO(response.read().decode("utf-8-sig"))))
    values=[]
    for row in rows:
        try:
            date=dt.date.fromisoformat(row.get("DATE") or row.get("observation_date"))
            value=float(row[series])
            values.append((date,value))
        except (ValueError,TypeError,KeyError): continue
    if not values: raise ValueError(f"No numeric observations: {series}")
    return sorted(values)
def trend(rows,days):
    end,value=rows[-1]; target=end-dt.timedelta(days=days)
    earlier=[(d,v) for d,v in rows if d<=target]
    if not earlier: return None
    d,prior=earlier[-1]
    return {"comparison_date":d.isoformat(),"prior":prior,"pct":round((value/prior-1)*100,3) if prior else None}
def main():
    now=dt.datetime.now(dt.timezone.utc); day=now.date().isoformat()
    OUT.mkdir(parents=True,exist_ok=True)
    results={}; failures={}
    for label,series in SERIES.items():
        try:
            rows=fetch(series)
            latest,value=rows[-1]
            if (now.date()-latest).days>14: raise ValueError(f"stale: {latest}")
            windows={str(n):trend(rows,n) for n in (14,28,84,365)}
            results[label]={"source":"FRED/Indeed","series_id":series,"as_of":latest.isoformat(),"value":value,"windows_days":windows,"source_url":f"https://fred.stlouisfed.org/series/{series}"}
        except Exception as e: failures[label]=str(e)
    # Preserve source-level provenance; do not claim uncollected research was performed.
    coverage={name:{"status":"missing","reason":"No verified automated collector configured"} for name in REQUIRED}
    coverage["indeed_fred"]={"status":"verified" if len(results)==len(SERIES) else "failed","series":list(results),"errors":failures}
    payload={"captured_at":now.isoformat(),"schema_version":1,"source_coverage":coverage,"fred":results,"raw_observations_policy":"Source history retained by FRED; this snapshot preserves each observed value and comparison values.","dashboard_publishable":False}
    path=OUT/(day+".json")
    if path.exists():
        # Same-day retries never silently overwrite a previous observation.
        path=OUT/(now.strftime("%Y-%m-%dT%H%M%SZ")+".json")
    path.write_text(json.dumps(payload,indent=2)+"\n")
    print(f"Snapshot: {path.relative_to(ROOT)}")
    print("Coverage:",json.dumps({k:v["status"] for k,v in coverage.items()}))
    # Intentionally fail until all critical source collectors and publication gates exist.
    if any(v["status"]!="verified" for v in coverage.values()):
        raise SystemExit("INCOMPLETE: dashboard publication blocked; missing required source collectors.")
if __name__=="__main__": main()
