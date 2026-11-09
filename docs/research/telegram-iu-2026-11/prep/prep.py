import json,sys,collections,re,os
d=json.load(open(sys.argv[1])); out=sys.argv[2]; os.makedirs(out,exist_ok=True)
def txt(m):
    t=m.get('text','')
    if isinstance(t,list):
        t=''.join(x if isinstance(x,str) else x.get('text','') for x in t)
    return t.strip()
byid={}
per=collections.Counter(); chars=collections.Counter(); kept=collections.Counter()
lines=collections.defaultdict(list)
for m in d['messages']:
    if m.get('type')!='message': continue
    t=txt(m); byid[m['id']]=t
    y=m['date'][:7]
    per[m['date'][:4]]+=1
    if len(t)<20 and not m.get('file_name'): continue
    t=re.sub(r'\s+',' ',t)
    if len(t)>2500: t=t[:2500]+' …'
    tag=''
    if m.get('forwarded_from'): tag='[FWD:'+str(m['forwarded_from'])[:40]+']'
    if m.get('file_name') or m.get('mime_type'): tag+='[FILE:'+str(m.get('file_name') or m.get('media_type') or '')[:60]+']'
    if m.get('photo'): tag+='[PHOTO]'
    r=''
    if m.get('reply_to_message_id') in byid:
        rt=byid[m['reply_to_message_id']]
        r=' ⟵re: '+re.sub(r'\s+',' ',rt)[:120]
    if not t and not tag: continue
    lines[y].append(f"{m['date'][:16]} #{m['id']} {tag}{t}{r}")
    kept[m['date'][:4]]+=1; chars[m['date'][:4]]+=len(lines[y][-1])
for y in sorted(per): print(y, per[y], kept[y], chars[y])
for ym,ls in lines.items():
    open(f"{out}/{ym}.txt",'w').write('\n'.join(ls))
