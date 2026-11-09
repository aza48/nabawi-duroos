import re,os,sys,collections,glob
src,out=sys.argv[1],sys.argv[2]; os.makedirs(out,exist_ok=True)
noise_fwd=re.compile(r'\[FWD:[^\]]*(قرآن كريم|أذكار|ملاذ|همم|مع الله|أجر|أجّر|قيس|قَيْس)')
prof=re.compile(r'(كيف|شلون|وش|ايش)\s*(وضع\s*)?(اختبار|اختبارات|الاختبار|شرح|تدريس|درجات|اسلوب|أسلوب)\s*(ال)?(دكتور|الشيخ|د\.|الدكتوره|الدكتورة|دكتوره|عند)|من درس عند|اللي درس|من يدرس عند|من عنده الدكتور|متشدد|متساهل|يتواصل معي|على الخاص|ع الخاص|خاص ضروري|كم الدرجة|ابشرك|الله يوفقك|جزاك الله|آمين|امين|بارك الله فيك|الله يعين')
seen=collections.Counter()
tot=collections.Counter()
for f in sorted(glob.glob(src+'/*.txt')):
    ym=os.path.basename(f)[:7]; keep=[]
    for l in open(f):
        l=l.rstrip('\n')
        body=l.split(' ',2)[2] if l.count(' ')>=2 else l
        main=body.split('⟵re:')[0]
        if noise_fwd.search(body): continue
        if prof.search(body): continue
        key=re.sub(r'\W','',main)[:200]
        seen[key]+=1
        if seen[key]>1 and len(key)>30: continue
        if len(main)<35 and '⟵re:' not in body: continue
        if len(main)<12: continue
        keep.append(l)
    open(f"{out}/{ym}.txt",'w').write('\n'.join(keep)+'\n')
    tot[ym[:4]]+=sum(len(x) for x in keep)
for y in sorted(tot): print(y,tot[y])
print(sum(tot.values()))
