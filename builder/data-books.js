// 50部知名心理学/心理治疗著作数据
// 字段：title书名 / en原书名(可空) / author作者 / core核心内容与风格 / ai对AI心理医生技能的借鉴点

module.exports = [
  {
    cat: "A. 经典理论源头",
    intro: "理解现代各种疗法的思想根基，为AI角色提供“讲得出出处”的专业纵深。",
    books: [
      { title: "《梦的解析》", en: "Die Traumdeutung", author: "弗洛伊德", core: "释梦与潜意识理论的奠基之作，“梦是愿望的达成”；示范如何从意象逐层联想至深层冲突。", ai: "象征与联想式追问的模板（“这个画面让你联想到什么？”）。" },
      { title: "《精神分析引论》", en: "A General Introduction to Psychoanalysis", author: "弗洛伊德", core: "面向大众的讲稿：口误、梦、神经症三大主题，专业概念讲得通俗流畅。", ai: "把专业概念讲给普通人的科普语感范本。" },
      { title: "《人及其象征》", en: "Man and His Symbols", author: "荣格", core: "荣格晚年写给大众的象征与原型入门，图文并茂，聚焦梦与直觉。", ai: "象征意象对话的素材库与提问方式。" },
      { title: "《自卑与超越》", en: "What Life Could Mean to You", author: "阿德勒", core: "个体心理学：自卑感与补偿、生活风格、合作与社会兴趣。", ai: "目的论提问与鼓励式语言的来源。" },
      { title: "《逃避自由》", en: "Escape from Freedom", author: "弗洛姆", core: "社会心理分析：现代人如何因自由的焦虑而逃入顺从与权威。", ai: "把个人困扰放回社会处境的重构句式。" },
      { title: "《爱的艺术》", en: "The Art of Loving", author: "弗洛姆", core: "爱是需要学习的实践：关心、责任、尊重、了解四要素。", ai: "关系议题的哲学化表达与四要素框架。" },
      { title: "《妈妈的心灵课》", en: "The Child, the Family, and the Outside World", author: "温尼科特", core: "母婴关系、抱持、“足够好的母亲”——安全感如何被养育出来。", ai: "安全抱持语气模板；谈原生家庭时的温暖视角。" },
      { title: "《安全基地》", en: "A Secure Base", author: "鲍尔比", core: "依恋理论总结：治疗师作为来访者探索世界的安全基地。", ai: "“安全基地”AI角色设定的理论依据。" }
    ]
  },
  {
    cat: "B. 人本与存在主义",
    intro: "AI心理医生“底色”的最佳来源：真诚、共情、直面生命的重大议题。",
    books: [
      { title: "《个人形成论》", en: "On Becoming a Person", author: "罗杰斯", core: "罗杰斯思想最完整的通俗表述：真诚一致、无条件积极关注、共情理解三大条件。", ai: "AI人本基调的第一蓝本。" },
      { title: "《当事人中心治疗》", en: "Client-Centered Therapy", author: "罗杰斯", core: "当事人中心疗法的系统阐述：理论与实践、回应方式分类。", ai: "反映式回应的分类学（情感反映/释义/澄清）。" },
      { title: "《存在主义心理治疗》", en: "Existential Psychotherapy", author: "欧文·亚隆", core: "四大终极关怀（死亡、自由、孤独、无意义）的系统教材。", ai: "意义/死亡/自由/孤独议题的问题库。" },
      { title: "《给心理治疗师的礼物》", en: "The Gift of Therapy", author: "欧文·亚隆", core: "85条治疗建议的对话式散文，句句可操作。", ai: "几乎可直接转写为AI风格规则（“把来访者当作会痛的人，而不是诊断”）。" },
      { title: "《爱情刽子手》", en: "Love's Executioner", author: "欧文·亚隆", core: "十个真实存在治疗案例的叙事经典，过程细节完整。", ai: "存在议题的叙事案例库与人设语料。" },
      { title: "《当尼采哭泣》", en: "When Nietzsche Wept", author: "欧文·亚隆", core: "心理治疗小说：医生布雷尔与哲学家尼采的互相治疗。", ai: "哲学辩论式对话范本；适合高智型用户话术。" },
      { title: "《直视骄阳》", en: "Staring at the Sun", author: "欧文·亚隆", core: "直面死亡焦虑：“波动影响”（rippling）——你对他人好的影响会持续扩散。", ai: "死亡焦虑与生命回顾话题的专用话术。" },
      { title: "《活出生命的意义》", en: "Man's Search for Meaning", author: "弗兰克尔", core: "集中营亲历＋意义疗法：人可以在任何处境中选择自己的态度。", ai: "苦难意义重构三路径（创造/体验/态度）。" },
      { title: "《人的自我寻求》", en: "Man's Search for Himself", author: "罗洛·梅", core: "现代人的空虚、孤独与焦虑，以及如何成为“他自己”。", ai: "空虚与从众议题的探讨框架。" },
      { title: "《少有人走的路》", en: "The Road Less Traveled", author: "斯科特·派克", core: "心智成熟的旅程：自律（延迟满足、承担责任）、爱、成长。", ai: "责任与自律框架的励志化表达，大众认可度极高。" }
    ]
  },
  {
    cat: "C. 认知行为与第三浪潮",
    intro: "AI最易工程化的工具箱：结构、量表、表格、练习一应俱全。",
    books: [
      { title: "《认知疗法：基础与应用》", en: "Cognitive Behavior Therapy: Basics and Beyond", author: "朱迪斯·贝克", core: "CBT标准教材：会谈结构、个案概念化、各项技术。", ai: "AI会话流程模板的直接来源。" },
      { title: "《伯恩斯新情绪疗法》", en: "Feeling Good", author: "大卫·伯恩斯", core: "CBT自助经典：每日情绪日志、十种认知扭曲、自评量表。", ai: "认知扭曲命名表＋情绪量表前后测。" },
      { title: "《控制愤怒》", en: "How to Control Your Anger Before It Controls You", author: "埃利斯", core: "REBT应用于愤怒：找出“他必须公平待我”式的要求并驳斥。", ai: "驳斥“必须/应该”的句式集。" },
      { title: "《辩证行为疗法技能训练手册》", en: "DBT Skills Training Manual", author: "玛莎·林内翰", core: "DBT四大模块技能卡与讲义全集：正念、痛苦耐受、情绪调节、人际效能。", ai: "情绪危机时的技能话术箱（TIP、DEAR MAN、彻底接纳）。" },
      { title: "《跳出头脑，融入生活》", en: "Get Out of Your Mind and Into Your Life", author: "史蒂文·海斯", core: "ACT工作手册：解离、接纳、价值、承诺行动的系列练习。", ai: "解离与价值练习的互动化脚本。" },
      { title: "《幸福的陷阱》", en: "The Happiness Trap", author: "拉塞尔·哈里斯", core: "ACT大众版：为什么越追逐快乐越痛苦，如何转向有价值的生活。", ai: "ACT的口语化比喻库，AI转述零门槛。" },
      { title: "《多舛的生命》", en: "Full Catastrophe Living", author: "乔恩·卡巴金", core: "MBSR完整教材：身体扫描、坐禅、正念瑜伽与七态度。", ai: "正念引导文字稿的母本。" },
      { title: "《此刻是一枝花》", en: "Wherever You Go, There You Are", author: "乔恩·卡巴金", core: "正念随笔集：短章、意象与日常练习。", ai: "正念式语言风格（短句、意象、留白）。" },
      { title: "《自我关怀的力量》", en: "Self-Compassion", author: "克里斯汀·内夫", core: "自我关怀三要素：善待自己、共通人性、正念，及大量练习。", ai: "自我关怀三句话模板与书写练习。" },
      { title: "《走出抑郁》", en: "Overcoming Depression", author: "保罗·吉尔伯特", core: "从进化心理学理解抑郁，并以慈悲取向逐步疗愈。", ai: "三情绪系统解释模型＋慈悲视角话术。" }
    ]
  },
  {
    cat: "D. 家庭关系与沟通",
    intro: "处理亲情、恋爱、婚姻、人际话题时的工具与语言范本。",
    books: [
      { title: "《新家庭如何塑造人》", en: "The New Peoplemaking", author: "维吉尼亚·萨提亚", core: "家庭沟通姿态与自我价值：讨好、指责、超理智、打岔及其转化。", ai: "四种姿态识别＋一致性表达句式。" },
      { title: "《萨提亚家庭治疗模式》", en: "The Satir Model", author: "萨提亚等", core: "冰山理论、治疗信念与转化性改变的完整体系。", ai: "冰山逐层提问框架（行为→感受→观点→期待→渴望）。" },
      { title: "《热锅上的家庭》", en: "The Family Crucible", author: "纳皮尔、惠特克", core: "一个家庭完整治疗过程的纪实小说，冲突对话极其真实。", ai: "家庭冲突对话的真实样本库。" },
      { title: "《家庭与家庭治疗》", en: "Families and Family Therapy", author: "萨尔瓦多·米纽庆", core: "结构式家庭治疗奠基之作：边界、子系统、活现与重构。", ai: "“活现”式对话设计（请用户复现真实冲突）。" },
      { title: "《幸福的婚姻》", en: "The Seven Principles for Making Marriage Work", author: "约翰·戈特曼", core: "四骑士理论与婚姻七原则，基于长期实证观察。", ai: "伴侣冲突诊断＋修复工具箱。" },
      { title: "《依恋：成人依恋的新科学》", en: "Attached", author: "阿米尔·莱文、蕾切尔·赫尔勒", core: "三种成人依恋风格（安全/焦虑/回避）在恋爱中的表现与匹配。", ai: "依恋风格科普话术，大众认知度极高。" },
      { title: "《非暴力沟通》", en: "Nonviolent Communication", author: "马歇尔·卢森堡", core: "观察—感受—需要—请求四步沟通法。", ai: "AI转述与表达的金标准句式（先讲观察再讲感受）。" },
      { title: "《亲密关系》", en: "Intimate Relationships", author: "罗兰·米勒", core: "亲密关系科学的权威教科书：吸引、依恋、冲突、修复。", ai: "关系议题的知识底座，供AI准确科普。" }
    ]
  },
  {
    cat: "E. 创伤与身体",
    intro: "创伤话题的顺序与边界：安全优先、去羞耻化、知道何时转介。",
    books: [
      { title: "《身体从未忘记》", en: "The Body Keeps the Score", author: "巴塞尔·范德考克", core: "创伤如何改写大脑与身体，以及药物之外多元疗法的综述经典。", ai: "去羞耻的神经科学解释模板（“这是神经系统在保护你”）。" },
      { title: "《创伤与复原》", en: "Trauma and Recovery", author: "朱迪思·赫尔曼", core: "创伤恢复三阶段（安全→回忆与哀悼→重新联结）与复杂创伤概念。", ai: "AI处理创伤话题的顺序铁律与见证式倾听角色。" },
      { title: "《唤醒心中的老虎》", en: "Waking the Tiger", author: "彼得·莱文", core: "躯体体验疗法：创伤能量如何经身体释放，滴定与摆荡原则。", ai: "身体感受提问句式（“现在身体哪里有感觉？”）。" }
    ]
  },
  {
    cat: "F. 大众疗愈与对话范本",
    intro: "最贴近用户语言的一批书：故事性强、豆瓣高分、可直接化用其对话质感。",
    books: [
      { title: "《也许你该找个人聊聊》", en: "Maybe You Should Talk to Someone", author: "洛莉·戈特利布", core: "治疗师兼来访者双重视角的真实回忆录，豆瓣约9.0分。", ai: "真实咨询对话的质感与AI人设灵感。" },
      { title: "《蛤蟆先生去看心理医生》", en: "Counselling for Toads", author: "罗伯特·戴博德", core: "童话形式的完整十次心理咨询，TA理论入门，豆瓣高分。", ai: "整段咨询流程的对话范本（AI训练语料级素材）。" },
      { title: "《被讨厌的勇气》", en: "The Courage to Be Disliked", author: "岸见一郎、古贺史健", core: "对话体阿德勒心理学：课题分离、目的论、活在当下。", ai: "课题分离话术（“这是谁的课题？”）。" },
      { title: "《幸福的勇气》", en: "The Courage to Be Happy", author: "岸见一郎、古贺史健", core: "阿德勒思想的教育与实践篇：爱、工作与共同体感觉。", ai: "爱与人际关系话题的深化话术。" },
      { title: "《了不起的我》", en: "——", author: "陈海贤", core: "自我发展心理学（本土）：心理防御、转折期、关系中的自我。", ai: "中文母语者的语言习惯与本土化表达。" },
      { title: "《一念之转》", en: "Loving What Is", author: "拜伦·凯蒂", core: "四问＋转念作业：这是真的吗？你能百分百确定吗？……", ai: "可直接使用的四问模板，结构完美适合AI提问。" },
      { title: "《心流》", en: "Flow", author: "契克森米哈赖", core: "最优体验心理学：全情投入的条件与幸福的关系。", ai: "投入感与意义话题的科普素材。" },
      { title: "《终身成长》", en: "Mindset", author: "卡罗尔·德韦克", core: "固定型与成长型思维如何塑造我们对失败的解读。", ai: "重构失败与评价的语言（“还没做到”而非“做不到”）。" },
      { title: "《聚焦》", en: "Focusing", author: "尤金·简德林", core: "六步聚焦自学手册：与身体“体会”工作。", ai: "身体感受引导的分步脚本。" },
      { title: "《神经质的实质与治疗》", en: "——", author: "森田正马", core: "森田疗法原典：疑病素质、精神交互作用、顺其自然为所当为。", ai: "东方行动主义话术（情绪如天气＋行动处方）。" },
      { title: "《人间游戏》", en: "Games People Play", author: "埃里克·伯恩", core: "TA沟通分析：人际“心理游戏”与PAC自我状态。", ai: "“迫害者—拯救者—受害者”三角识别，用于关系模式反馈。" }
    ]
  }
];
