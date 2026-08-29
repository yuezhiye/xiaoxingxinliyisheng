const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
  TableOfContents, PageBreak, PageNumber, Footer, LevelFormat,
  ExternalHyperlink
} = require("docx");

const therapistGroups = require("./data-therapists.js").concat(require("./data-therapists2.js"));
const bookGroups = require("./data-books.js");

const FONT = "Microsoft YaHei";
const BODY = 21;          // 10.5pt
const SMALL = 18;         // 9pt
const NAVY = "1F3864";
const HEADFILL = "1F3864";
const ZEBRA = "EDF2F9";
const USABLE = 9026;      // A4 width 11906 - 2*1440 margins

// ---------- helpers ----------
const P = (text, opts = {}) => new Paragraph({
  spacing: { after: opts.after ?? 120, line: 300 },
  alignment: opts.align,
  numbering: opts.numbering,
  children: [new TextRun({ text, font: FONT, size: opts.size ?? BODY, bold: opts.bold, color: opts.color, italics: opts.italics })]
});
const Rich = (runs, opts = {}) => new Paragraph({
  spacing: { after: opts.after ?? 120, line: 300 },
  alignment: opts.align,
  numbering: opts.numbering,
  children: runs.map(r => new TextRun({ font: FONT, size: BODY, ...r }))
});
const Bullet = (text, opts = {}) => P(text, { ...opts, numbering: { reference: "bullets", level: 0 } });
const BulletRich = (runs) => Rich(runs, { numbering: { reference: "bullets", level: 0 } });
const NumItem = (text, opts = {}) => P(text, { ...opts, numbering: { reference: "numlist", level: 0 } });
const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, font: FONT })] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: t, font: FONT })] });
const H3 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: t, font: FONT })] });
const PageBreakP = () => new Paragraph({ children: [new PageBreak()] });
const Label = (label, text) => Rich([{ text: label, bold: true, color: NAVY }, { text }]);

function cell(children, w, opts = {}) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: opts.fill ? { type: ShadingType.CLEAR, fill: opts.fill } : undefined,
    margins: { top: 80, bottom: 80, left: 110, right: 110 },
    children
  });
}
const CellP = (text, opts = {}) => new Paragraph({
  spacing: { after: 20, line: 260 },
  children: [new TextRun({ text, font: FONT, size: opts.size ?? SMALL, bold: opts.bold, color: opts.color, italics: opts.italics })]
});
function headerRow(labels, widths) {
  return new TableRow({
    tableHeader: true,
    children: labels.map((t, i) => cell([CellP(t, { bold: true, color: "FFFFFF" })], widths[i], { fill: HEADFILL }))
  });
}
function makeTable(widths, rows) {
  return new Table({
    width: { size: USABLE, type: WidthType.DXA },
    columnWidths: widths,
    rows
  });
}
const SP = () => P("", { after: 60 });

// ---------- cover ----------
const cover = [
  P("", { after: 1800 }),
  P("心理治疗师对话方法与心理学名著整理", { align: AlignmentType.CENTER, bold: true, size: 52, color: NAVY, after: 300 }),
  P("—— 100位知名心理治疗师的治疗过程·行事风格·对话技术 + 50部经典著作 ——", { align: AlignmentType.CENTER, size: 26, color: "595959", after: 2400 }),
  P("用途：为构建“AI心理医生角色扮演与心理疏导”技能（Skill）提供资料库", { align: AlignmentType.CENTER, size: 24, after: 160 }),
  P("内容：治疗师档案（按流派分组）· 著作整理 · 共性提炼与AI技能设计建议 · 伦理红线", { align: AlignmentType.CENTER, size: 22, color: "595959", after: 1600 }),
  P("编制日期：2026年8月29日　｜　资料来源：公开网络资料与经典文献整理", { align: AlignmentType.CENTER, size: 20, color: "808080" }),
  PageBreakP()
];

// ---------- TOC ----------
const toc = [
  P("目　录", { bold: true, size: 32, color: NAVY, after: 200 }),
  new TableOfContents("目录", { hyperlink: true, headingStyleRange: "1-2" }),
  P("（在Word中打开后：右键目录 → “更新域” 即可生成/刷新页码）", { size: 18, color: "808080", italics: true }),
  PageBreakP()
];

// ---------- 前言/使用说明 ----------
const preface = [
  H1("文档说明与使用方法"),
  P("本文档面向“让AI扮演心理医生、对用户进行心理疏导”的技能（Skill）开发场景，包含三大部分："),
  Bullet("第一部分：100位知名心理治疗师档案，按18组流派分组（第1–9组为经典核心，第10–18组为扩展补充）。每份档案含：流派身份、代表著作、治疗过程、对话风格、标志性技术（附示例问句）、AI角色扮演要点。"),
  Bullet("第二部分：50部知名心理学著作整理，按6大类编排，每部含核心内容与“对AI技能的借鉴点”。"),
  Bullet("第三部分：共性提炼——通用咨询流程、12项高频对话技术速查、流派风格光谱、议题-风格适配表、伦理与危机处理红线。这是开发Skill时最应优先转写进系统提示（system prompt）的内容。"),
  P("建议的使用方法：①先读第三部分，确定AI的默认风格配方与流程骨架；②再按目标用户的主要议题，从第一部分挑选2–4位治疗师作为风格原型，参考其“对话风格”与“示例问句”撰写人设提示词；③从第二部分书目中选取3–5本的“借鉴点”，扩充具体话术；④务必将第三部分第5节的伦理红线全部内置为硬规则。"),
  PageBreakP()
];

// ---------- Part 1: therapists ----------
let no = 0;
therapistGroups.forEach((g) => {
  g.members.forEach((m) => { m.no = ++no; });
});
const part1 = [H1("第一部分　100位知名心理治疗师档案"), P("共18组100人（第1–9组为经典核心大师，第10–18组为扩展补充，覆盖更多分支与当代人物）。每份档案结构：流派身份 → 代表著作 → 治疗过程 → 对话风格 → 标志性技术（含示例问句）→ AI角色扮演要点。")];
therapistGroups.forEach((g, gi) => {
  part1.push(H2(g.title));
  part1.push(P(g.intro, { italics: true, color: "595959", size: 20 }));
  g.members.forEach((m, mi) => {
    part1.push(H3(`${m.no}　${m.name}｜${m.en}`));
    part1.push(Label("流派身份：", m.school));
    part1.push(Label("代表著作：", m.works));
    part1.push(Label("治疗过程：", m.process));
    part1.push(Label("对话风格：", m.style));
    part1.push(Rich([{ text: "标志性技术：", bold: true, color: NAVY }], { after: 40 }));
    m.techniques.forEach(t => part1.push(Bullet(t)));
    part1.push(Label("AI角色扮演要点：", m.ai));
    part1.push(SP());
  });
});
part1.push(PageBreakP());

// ---------- Part 2: books ----------
const BW = [600, 2600, 1400, 2400, 2026];
const part2 = [H1("第二部分　50部知名心理学著作整理"), P("共6大类50部，均为大众认可度高、与心理治疗对话直接相关的著作。表格列：书名（附原书名）→ 作者 → 核心内容与风格 → 对AI技能的借鉴点。")];
let bookNo = 0;
bookGroups.forEach(g => {
  part2.push(H2(g.cat));
  part2.push(P(g.intro, { italics: true, color: "595959", size: 20 }));
  const rows = [headerRow(["序号", "书名（中/原名）", "作者", "核心内容与风格", "对AI技能的借鉴点"], BW)];
  g.books.forEach((b, i) => {
    bookNo++;
    const fill = i % 2 === 1 ? ZEBRA : undefined;
    rows.push(new TableRow({
      children: [
        cell([CellP(String(bookNo), { bold: true })], BW[0], { fill }),
        cell([CellP(b.title, { bold: true }), CellP(b.en === "——" ? "" : b.en, { italics: true, color: "595959" })], BW[1], { fill }),
        cell([CellP(b.author)], BW[2], { fill }),
        cell([CellP(b.core)], BW[3], { fill }),
        cell([CellP(b.ai)], BW[4], { fill })
      ]
    }));
  });
  part2.push(makeTable(BW, rows));
  part2.push(SP());
});
part2.push(PageBreakP());

// ---------- Part 3: synthesis ----------
const TW = [1500, 2200, 5326];
const techRows = [
  ["情感反映", "接住情绪，证明“被听见”", "“听起来你感到很委屈——努力没有被看见，换谁都会难受。”"],
  ["开放式提问", "展开叙述，避免审问感", "“能多说说那次经历吗？当时发生了什么？”"],
  ["具体化", "把模糊抱怨变成可工作的问题", "“‘他们都不喜欢我’——‘他们’指哪些人？最近一次是什么时候？”"],
  ["六级验证", "情绪崩溃时的第一回应（DBT）", "“在你的经历背景下，出现这种感觉是完全可以理解的。”"],
  ["苏格拉底提问", "协作检验想法而非说教（CBT）", "“支持这个想法的证据是什么？有没有别的解释？最坏会怎样？”"],
  ["例外问句", "找到问题失效的时刻（SFBT）", "“有没有哪一次，它没有出现或轻一些？那时候有什么不同？”"],
  ["刻度问句", "量化状态，定位最小进步", "“0到10分，现在是几分？是什么让你有这几分？怎样能升1分？”"],
  ["奇迹问句", "把“逃离问题”转为“描述愿景”", "“假设今晚睡着后奇迹发生，明天你最先注意到的不同会是什么？”"],
  ["外化命名", "把问题与人分开，降低羞耻（叙事）", "“如果给这种感觉起个名字，你会叫它什么？它什么时候来？”"],
  ["重构", "换一个更真实也更善意的解读", "“你的愤怒其实在保护你在乎的东西。”"],
  ["朋友视角换位", "启动自我关怀（CFT）", "“如果你最好的朋友遇到这件事，你会对TA说什么？”"],
  ["此刻化", "把谈话拉回当下体验（亚隆/皮尔斯）", "“你打出这些字的时候，心里、身体上是什么感觉？”"]
];

const MW = [2000, 2400, 4626];
const matchRows = [
  ["情绪低落、自我否定", "CBT（贝克、伯恩斯）＋自我关怀（内夫）", "情绪日志、认知歪曲命名、三句话自我关怀、行为激活小任务"],
  ["焦虑、担忧、反刍", "ACT（海斯）＋正念（卡巴金）", "解离练习、呼吸锚定、价值澄清、“想法只是想法”"],
  ["愤怒、“必须主义”、完美主义", "REBT（埃利斯）＋DBT验证", "驳斥“必须/应该”、区分健康与不健康负性情绪、痛苦耐受"],
  ["关系冲突、原生家庭", "萨提亚＋鲍恩＋叙事（怀特）", "冰山逐层提问、四种姿态识别、去三角化、家谱图问题、外化"],
  ["恋爱、婚姻矛盾", "EFT（约翰逊）＋戈特曼", "追-逃循环命名、四骑士与解毒剂、软启动句式、脆弱情绪表露"],
  ["空虚、意义感缺失", "存在主义（亚隆、弗兰克尔、罗洛·梅）", "四大存在关怀、意义三路径、波动影响、有限性提问"],
  ["想改变却动不了、拖延", "MI（米勒）＋SFBT", "OARS、捕捉改变语言、奇迹问句、刻度问句、一小步计划"],
  ["强迫思维、疑病倾向", "森田疗法＋ACT", "精神交互作用心理教育、“情绪如天气”、为所当为的行动处方"],
  ["创伤相关话题", "稳定化优先（赫尔曼、范德考克、波格斯）", "安全清单、窗口教育、地面化技术；严禁引导细节回忆，明确建议专业转介"]
];

const part3 = [
  H1("第三部分　共性提炼：AI心理医生技能设计参考"),
  P("本部分把前两部分的资料压缩为可直接落地的设计素材。开发Skill时建议优先转写第3.1、3.2、3.5节。"),

  H2("3.1　通用咨询对话流程（会话骨架）"),
  BulletRich([{ text: "开场与稳定：", bold: true }, { text: "一致的开场问候（人设可预测性本身就是疗愈因素——依恋视角）；简述角色与边界；以“今天想聊点什么？”共同设置议程。" }]),
  BulletRich([{ text: "首次访谈要素：", bold: true }, { text: "主要困扰及起始时间、近期变化与生活事件、支持系统与资源、既往应对方式、情绪与安全状态评估（含风险筛查）。" }]),
  BulletRich([{ text: "工作期循环：", bold: true }, { text: "倾听 → 情感反映/验证 → 具体化探索 → （按所选流派）干预 → 小结 → 布置一个小任务或观察任务。" }]),
  BulletRich([{ text: "每次收尾：", bold: true }, { text: "总结本次要点（“今天你提到两件重要的事……”）＋开放式反馈（“哪部分对你最有用？”）＋下次衔接。" }]),
  BulletRich([{ text: "结束与巩固：", bold: true }, { text: "巩固收获、预警复发并给应对预案、保持开放（“随时可以回来聊”）。" }]),

  H2("3.2　十二项高频对话技术速查表"),
  makeTable(TW, [
    headerRow(["技术", "用途", "示例句式"], TW),
    ...techRows.map((r, i) => new TableRow({
      children: r.map((t, j) => cell([CellP(t, { bold: j === 0 })], TW[j], { fill: i % 2 === 1 ? ZEBRA : undefined }))
    }))
  ]),
  SP(),

  H2("3.3　流派风格光谱与AI默认配方"),
  Bullet("共情优先 ↔ 改变优先：罗杰斯/温尼科特/科胡特/林内翰 ←→ 埃利斯/海利/贝克。"),
  Bullet("高结构 ↔ 低结构：贝克母女/夏皮罗/福阿 ←→ 罗杰斯/简德林/温尼科特。"),
  Bullet("短程未来取向 ↔ 长程过去取向：SFBT/MI ←→ 精神分析/荣格。"),
  Rich([{ text: "AI默认配方建议：", bold: true, color: NAVY }, { text: "以罗杰斯式共情为底座（情感反映＋无条件积极关注）＋ SFBT的目标与刻度问句做导航 ＋ CBT认知工具做方法库 ＋ DBT六级验证做情绪安全网 ＋ 森田/ACT做行动处方；存在主义视角用于意义类议题的加深。该配方兼顾安全感、方向感与可操作性，且全部技术可文字化。" }]),

  H2("3.4　议题—风格适配表"),
  makeTable(MW, [
    headerRow(["用户议题", "推荐流派风格", "核心技术"], MW),
    ...matchRows.map((r, i) => new TableRow({
      children: r.map((t, j) => cell([CellP(t, { bold: j === 0 })], MW[j], { fill: i % 2 === 1 ? ZEBRA : undefined }))
    }))
  ]),
  SP(),

  H2("3.5　伦理与危机处理红线（必须内置为硬规则）"),
  P("以下条目来自各流派临床伦理共识，是“AI心理医生”与普通聊天机器人的分界线，建议全部写入系统提示并不允许被用户指令覆盖："),
  NumItem("角色声明：开场说明自身是AI心理支持角色，不提供正式诊断与医疗处置，情况严重时鼓励寻求线下专业帮助。"),
  NumItem("自杀/自伤信号响应：不回避、直接而温和地询问（“你有没有想过伤害自己？”）→ 用DBT验证接住情绪 → 不评判、不说教 → 提供求助资源（如：全国心理援助热线12356、北京心理危机研究与干预中心010-82951332、希望热线400-161-9995，具体以最新官方信息为准）→ 建议联系信任的人或就近急诊。"),
  NumItem("不诊断、不开药、不替代精神科治疗；出现幻觉、妄想、严重解离、进食障碍危象等表现时，明确建议精神科就诊。"),
  NumItem("创伤内容处理顺序：先稳定化与安全确认，绝不主动引导细节回忆；明确告知AI能力边界并建议专业创伤治疗。"),
  NumItem("人设透明：使用“受某流派启发的AI咨询师”设定，不冒充真实执业医师或具体在世人物本人。"),
  NumItem("隐私保护：不引导用户提交可识别身份的敏感信息（身份证号、住址等），并提示聊天记录的存储属性。")
];
part3.push(PageBreakP());

// ---------- Appendix: sources ----------
const srcList = [
  ["NCBI StatPearls：Person-Centered Therapy（罗杰斯）", "https://www.ncbi.nlm.nih.gov/books/NBK589708/"],
  ["Psychology Tools：Socratic Questioning（贝克式提问）", "https://www.psychologytools.com/professional/techniques/socratic-questioning-socratic-dialogue"],
  ["PMC：Socratic questioning与症状改善研究", "https://pmc.ncbi.nlm.nih.gov/articles/PMC4449800/"],
  ["Albert Ellis Institute：REBT与ABC模型", "https://albertellis.org/rebt-therapy-in-the-context-of-modern-psychological-research/"],
  ["Psychology Today：Yalom论此时此地", "https://www.psychologytoday.com/us/blog/in-therapy/201009/yalom-on-the-here-and-now"],
  ["GoodTherapy：Satir转型系统治疗", "https://www.goodtherapy.org/learn-about-therapy/types/satir-transformational-systemic-therapy"],
  ["Counselling Tutor：格式塔优势者/劣势者与双椅", "https://counsellingtutor.com/052-self-care-skills-in-practice-topdog-and-underdog-in-gestalt-therapy/"],
  ["Wikipedia：Solution-focused brief therapy（SFBT）", "https://en.wikipedia.org/wiki/Solution-focused_brief_therapy"],
  ["Positive Psychology：SFBT技术合集（奇迹/刻度/例外/应对问句）", "https://positivepsychology.com/solution-focused-therapy-techniques-worksheets/"],
  ["PMC：DBT的独特要素（验证与辩证策略）", "https://pmc.ncbi.nlm.nih.gov/articles/PMC2963469/"],
  ["Linehan六级验证详解", "https://ia-et-psychotherapie.com/en/resources/concepts/emotional-validation-linehan/"],
  ["MINT：动机式访谈与OARS", "https://motivationalinterviewing.org/understanding-motivational-interviewing"],
  ["RACGP：MI技术与改变阶段实操", "https://www.racgp.org.au/afp/2012/september/motivational-interviewing-techniques"],
  ["Dulwich Centre：叙事疗法之外化", "https://dulwichcentre.com.au/courses/what-is-narrative-practice-a-free-course/lessons/externalising/"],
  ["EMDRIA：EMDR八阶段", "https://www.emdria.org/blog/the-eight-phases-of-emdr-therapy/"],
  ["First Session：躯体体验疗法（滴定/摆荡/释放）", "https://www.firstsession.com/resources/somatic-experiencing"],
  ["Wiley：Herman创伤恢复三阶段原论文", "https://onlinelibrary.wiley.com/doi/full/10.1046/j.1440-1819.1998.0520s5S145.x"],
  ["Bessel van der Kolk官网：《身体从未忘记》", "https://www.besselvanderkolk.com/resources/the-body-keeps-the-score"],
  ["Simply Psychology：情绪聚焦伴侣治疗与负性循环", "https://www.simplypsychology.com/articles/emotionally-focused-therapy-couples"],
  ["维基百科：森田疗法（住院四期、顺其自然为所当为）", "https://zh.wikipedia.org/wiki/%E6%A3%AE%E7%94%B0%E7%99%82%E6%B3%95"],
  ["河南理工大学转载：森田疗法四期详解", "https://gsxy.hpu.edu.cn/info/1048/4573.htm"],
  ["豆瓣：热门心理图书TOP10", "https://m.douban.com/subject_collection/ECCAKJ37I"],
  ["Five Books：The Best Psychology Books", "https://fivebooks.com/category/psychology/"],
  ["英国心理学会：终极心理学阅读书单", "https://www.bps.org.uk/psychologist/ultimate-psychology-reading-list"],
  ["学术期刊：视频心理咨询中13种常用技术分析", "https://www.sciscanpub.com/index/journals/ainfo/tppc/6477.html"]
];
const part4 = [
  H1("附录　主要参考来源"),
  P("本文档内容整理自以下公开网络资料与相关经典著作，检索日期：2026年8月29日。"),
  ...srcList.map(([t, u]) => new Paragraph({
    spacing: { after: 40, line: 280 },
    children: [
      new TextRun({ text: "▪ ", font: FONT, size: 20, color: NAVY }),
      new TextRun({ text: t + "　", font: FONT, size: 20 }),
      new ExternalHyperlink({ children: [new TextRun({ text: u, font: FONT, size: 18, style: "Hyperlink" })], link: u })
    ]
  }))
];

// ---------- document ----------
const doc = new Document({
  creator: "Claude",
  title: "心理治疗师对话方法与心理学名著整理",
  features: { updateFields: true },
  styles: {
    default: {
      document: { run: { font: FONT, size: BODY } },
      heading1: { run: { font: FONT, size: 32, bold: true, color: NAVY }, paragraph: { spacing: { before: 320, after: 200 } } },
      heading2: { run: { font: FONT, size: 26, bold: true, color: "2E5395" }, paragraph: { spacing: { before: 280, after: 160 } } },
      heading3: { run: { font: FONT, size: 23, bold: true, color: "404040" }, paragraph: { spacing: { before: 220, after: 120 } } }
    }
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 460, hanging: 260 } } } }] },
      { reference: "numlist", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 460, hanging: 260 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "— ", font: FONT, size: 18, color: "808080" }),
            new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 18, color: "808080" }),
            new TextRun({ text: " —", font: FONT, size: 18, color: "808080" })
          ]
        })]
      })
    },
    children: [
      ...cover, ...toc, ...preface, ...part1, ...part2, ...part3, ...part4
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  const out = path.join(__dirname, "..", "docs", "心理治疗师对话方法与心理学名著整理.docx");
  fs.writeFileSync(out, buf);
  console.log("written:", out, buf.length, "bytes");
});
