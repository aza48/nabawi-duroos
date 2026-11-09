import sys,glob,os,collections,re
src,out=sys.argv[1],sys.argv[2]; os.makedirs(out,exist_ok=True); t=collections.Counter()
chatter=re.compile(r'(متى (تنزل|ينزل|تطلع|يطلع)|نزلت النتائج|نزل الجدول|كم باقي|الله يرحم|رحمه الله|مبروك|ألف مبروك|الف مبروك|عظم الله|تهنئة|يسعد صباح|صباح الخير|مساء الخير|حياك|ابشر|تم بحمد الله|ما شاء الله تبارك)')
for f in sorted(glob.glob(src+'/*.txt')):
    ym=os.path.basename(f)[:7]; keep=[]
    for l in open(f):
        l=l.rstrip('\n')
        body=l.split(' ',2)[2] if l.count(' ')>=2 else l
        parts=body.split('⟵re:'); main=parts[0]; re_=parts[1] if len(parts)>1 else ''
        if len(main)<120 and chatter.search(main): continue
        ok = len(main)>=60 or (re_ and len(main)>=25 and ('؟' in re_ or '?' in re_ or 'كيف' in re_ or 'هل' in re_))
        if ok: keep.append(l)
    open(f"{out}/{ym}.txt",'w').write('\n'.join(keep)+'\n'); t[ym]=sum(len(x)+1 for x in keep)
ys=collections.Counter()
for k,v in t.items(): ys[k[:4]]+=v
print(dict(sorted(ys.items())), sum(ys.values()))
print(' '.join(f"{k}:{v//1000}" for k,v in sorted(t.items()) if k>='2024'))
