#!/usr/bin/env python3
import os
import random

# Daftar kata dasar untuk komponen
base_words = [
    "Accelerator", "Account", "Achiever", "Acquirer", "Activator", 
    "Adapter", "Adder", "Adjuster", "Admin", "Advanced",
    "Advisor", "Aggregator", "Alert", "Aligner", "Allocator",
    "Analyzer", "Animator", "Annotator", "Appender", "Approver",
    "Archiver", "Arranger", "Assembler", "Assigner", "Attacher",
    "Auditor", "Authenticator", "Authorizer", "AutoLoader", "Avalancer",
    "Balancer", "Banner", "Barcode", "BaseLine", "Battery",
    "Beacon", "Binder", "BitMap", "BlackList", "BlockChain",
    "BookMark", "Boolean", "Border", "BottomNav", "BoxModel",
    "BreakPoint", "Bridge", "Browser", "Buffer", "Builder",
    "Bullet", "Bundle", "Button", "Cache", "Calculator",
    "Calendar", "Callback", "Camera", "Canvas", "Caption",
    "Capture", "Card", "Carousel", "Carrier", "Cartesian",
    "Cascade", "Catalog", "Category", "Center", "Certificate",
    "Channel", "Chart", "CheckBox", "Checker", "ChildNode",
    "ChipSet", "Chrono", "Circle", "Circuit", "Clarity",
    "ClassMap", "Cleaner", "ClickEvent", "Client", "ClipBoard",
    "Clock", "Clone", "CloudSync", "Cluster", "CodeBlock",
    "Collapse", "Collector", "ColorMap", "Column", "ComboBox",
    "Command", "Comment", "Commit", "Compiler", "Component",
    "Composer", "Compressor", "Computer", "Concat", "Config",
    "Connect", "Console", "Constant", "Contact", "Container",
    "Content", "Context", "Control", "Converter", "Cookie",
    "Coordinate", "Copier", "Core", "Counter", "Coupon",
    "Creator", "Credit", "Crop", "CrossFade", "Crypto",
    "Cube", "Currency", "Cursor", "Curve", "CustomTag",
    "Dashboard", "DataBase", "DataGrid", "DataSet", "DataView",
    "DatePick", "Debugger", "Decoder", "Decorator", "Decryptor",
    "Default", "Deferrer", "Delegate", "Delta", "Density",
    "Deployer", "Depth", "Designer", "Desktop", "Detector",
    "Device", "Dialog", "Dictionary", "DiffTool", "Digital",
    "Dimension", "DirectLink", "Director", "Disabler", "Discard",
    "Discover", "DiskSpace", "Display", "Distance", "Divider",
    "DockPanel", "Document", "Domain", "Dominator", "DoorWay",
    "DoubleTap", "DownLoad", "DragDrop", "Drawer", "DreamCast",
    "DropDown", "DualScreen", "Dummy", "Dynamic", "EcoSystem",
    "EdgeNet", "Editor", "Effect", "Element", "EmailBox",
    "Embedder", "Emitter", "Emulator", "Encoder", "Encryptor",
    "EndPoint", "Engine", "Enhancer", "Enricher", "EnterKey",
    "Entity", "EntryPoint", "EnumMap", "Envelope", "Episodic",
    "Equalizer", "Equipment", "ErrorLog", "Escaper", "Evaluator",
    "EventBus", "Exchanger", "Executor", "Expander", "Explorer",
    "Exporter", "Extender", "External", "Extractor", "EyeDrop",
    "FaceBook", "Factory", "FadeIn", "Feature", "FeedBack",
    "Fetcher", "FieldSet", "FileDrop", "Filter", "FinalState",
    "FireWall", "FitScreen", "FixedPos", "FlagIcon", "FlashMsg",
    "FlexBox", "FlipCard", "FloatVal", "FlowChart", "FlyOut",
    "FocusTrap", "FolderTree", "FontMap", "FootNote", "ForLoop",
    "ForceGraph", "ForeCast", "FormKit", "FormatTxt", "ForwardRef",
    "FrameRate", "FreeText", "FreqBand", "FrontEnd", "FullPage",
    "FuncCall", "FuseWire", "GadgetBox", "Gallery", "GamePad",
    "GateWay", "GeoMap", "Gesture", "GetParam", "GhostText",
    "GifAnim", "GlobalVar", "GlowEff", "GradScale", "GramCheck",
    "GridBag", "GroupBy", "GuardRail", "GuideLine", "HabitTracker",
    "HalfMoon", "HandDraw", "HardDisk", "HashTag", "HeadLine",
    "HealthChk", "HeatMap", "HeavyLoad", "HelpDesk", "HexCode",
    "HighLite", "HistPlot", "HomeBase", "HookUp", "HorizScroll",
    "HostServer", "HotKey", "HourGlass", "HoverTip", "HtmlTag",
    "HttpReq", "HubSpot", "HyperLink", "IceBreak", "IconSet",
    "IdToken", "ImageMap", "ImgZoom", "Impulse", "IncDec",
    "IndexDb", "Indicator", "Infinite", "InfoBox", "InitSys",
    "InkDraw", "InputBox", "Insertion", "Inspector", "InstallApp",
    "IntelliSense", "Interact", "Internal", "Interval", "IntoView",
    "Invitation", "Invoice", "IoStream", "IpAddress", "IronClad",
    "IsoDate", "ItemCart", "Iterate", "JackPlug", "JamSession",
    "JavaApp", "JobQueue", "JoinTable", "JoyStick", "JsonParse",
    "JumpTo", "Justify", "KeyFrame", "KeyGuard", "KeyWord",
    "Kilogram", "KindSort", "Kinetic", "KitBag", "KnobCtrl",
    "LabelTag", "LambdaFn", "LandingPg", "LangSwitch", "LaptopMode",
    "LargeTxt", "LastMod", "LayerStack", "LayoutGrid", "LazyLoad",
    "LeadForm", "LeftPanel", "LegendKey", "LevelBar", "LibLoad",
    "LifeCycle", "LightBox", "LimitVal", "LineArt", "LinkBtn",
    "ListBox", "LiveChat", "LoadBal", "LocalSto", "LockScreen",
    "LogEntry", "LoginBox", "LogoImg", "LongPress", "LookUp",
    "LoopBack", "LowPass", "LoyaltyPts", "MacroCmd", "MailBox",
    "MainDash", "MakeFile", "ManuFact", "MapCoord", "MarqueeTxt",
    "MaskInput", "MasterKey", "MatchPat", "MathFunc", "MaxVal",
    "MediaPlay", "MemCache", "MenuNav", "MergeSort", "MeshNet",
    "MsgAlert", "MetaTag", "MeterBar", "MicroSec", "MidPoint",
    "Migrate", "Minimap", "MinValue", "MixAudio", "MobApp",
    "ModalWin", "Modulate", "MomentJs", "Monitor", "MoonPhase",
    "MotionFx", "MountPt", "MouseEvt", "MoveAnim", "MultiTab",
    "MusicPlayer", "MutateData", "NanoTech", "NatLang", "NavRail",
    "NearMe", "NetSpeed", "NewUser", "NextPage", "NightMode",
    "NineGrid", "NoSqlDb", "NodeTree", "NoiseCan", "NormDist",
    "NotifCtr", "NullSafe", "NumPad", "ObjMap", "ObsRec",
    "OffCanvas", "Offline", "OffsetVal", "OldData", "OnBoard",
    "OneClick", "OpenSrc", "Optimize", "OrbitCtl", "OrderLst",
    "OrgChart", "Origami", "OutBound", "OverLay", "PackZip",
    "PageNav", "PairCode", "PanZoom", "Parallax", "ParentNode",
    "ParkZone", "PassKey", "PasteBin", "PatchUp", "PayGate",
    "PdfView", "PeerNet", "PenTool", "Percent", "PerfMon",
    "Periodic", "PermSet", "PersGrid", "PetCare", "Phantom",
    "PhoneIn", "PhotoGal", "PhysEng", "PicUpload", "PieChart",
    "PinDrop", "PipeLine", "PitchCtl", "PixelArt", "PlaceHold",
    "PlainText", "PlayList", "PlotArea", "PlugIn", "PlusMinus",
    "PngImg", "PodCast", "PointMap", "Polaris", "PollVote",
    "PolyFill", "PopOver", "PopUp", "PortFolio", "PostFix",
    "PowerBar", "PreLoad", "Precise", "PredicT", "PrefPane",
    "PreLoad", "Presets", "PressTap", "PrevBtn", "PrimeNum",
    "PrintDoc", "Privilege", "ProCode", "ProcMon", "ProdList",
    "Profiler", "ProgBar", "ProjMgr", "PromoCode", "PropVal",
    "Protect", "ProtoTyp", "ProvEnc", "ProxySrv", "PubSub",
    "PullDown", "PulseRate", "PumpFun", "PureCss", "PushNotif",
    "Pyramid", "QrCode", "QuadCore", "QualTest", "Quantum",
    "QueryStr", "QuickAct", "QuotaChk", "RadialMenu", "RadioBtn",
    "RainBow", "RamUsage", "RandGen", "RangeSl", "RankList",
    "RaportXml", "RateLim", "RawData", "ReactJs", "ReadMore",
    "RealTime", "Recycle", "RedoAct", "ReduxSt", "RefLink",
    "Refresh", "RegEx", "RegForm", "Reloader", "RemindMe",
    "RemoteDb", "RenderFx", "Replica", "ReqResp", "Resizer",
    "Resolve", "RestApi", "ResumeUp", "RetryOp", "RevShare",
    "RichText", "RightCls", "RingBell", "RiskAss", "RoadMap",
    "RoboTest", "RootDir", "Rotate3D", "RoundBtn", "RowSet",
    "RsaKey", "RteEdit", "RuleEng", "RunTime", "SafeMode",
    "Salutation", "SamplRt", "Satellit", "SaveAs", "ScanDoc",
    "Scheduler", "SchemaX", "ScopeVar", "Scratch", "ScreenSh",
    "ScrollY", "SearchBox", "SecLayer", "SeedRnd", "SelectAll",
    "SelfHeal", "SemVer", "SendMail", "SensorDb", "SeqGen",
    "Serializ", "ServWrk", "Session", "SetTimeout", "ShapeDraw",
    "ShareBtn", "ShellCmd", "ShiftKey", "ShipTrack", "ShopCart",
    "ShortCut", "ShowHide", "Shuffle", "SideBar", "SigGraph",
    "SignIn", "Simulink", "SinglePg", "SiteMap", "SizeBox",
    "Skeleton", "SkipLink", "SlideIn", "SlowMo", "SmartTag",
    "SmoothSc", "SnapGrid", "SocialLn", "SoftDel", "SortAsc",
    "SoundWv", "SourceCd", "SpaceSep", "SparkLine", "SpeakTxt",
    "SpecList", "SpeedDial", "SpellChk", "SpinBtn", "SplashSc",
    "SplitView", "Sponsor", "SpotLight", "SpreadSh", "SpyWare",
    "SqLite", "Stabilize", "StackTrc", "StageDev", "StampImg",
    "StandBy", "StarRate", "StartUp", "StatCalc", "StateMgr",
    "StatGraph", "StdOut", "StepProc", "StickyNt", "StockTkr",
    "StopWatch", "Storage", "StoryBd", "StreamVid", "StrictMd",
    "StringOps", "Stripes", "StructDb", "StyleShe", "SubDomain",
    "SubMenu", "SubmitBtn", "SubTotal", "Success", "SummryTbl",
    "SunRise", "SuperUsr", "SupplyCh", "SvgIcon", "SwapVal",
    "SyncUp", "SysAdmin", "TabGroup", "TableGrd", "TabMenu",
    "TagCloud", "TailWind", "TakePic", "TalkBack", "TanColor",
    "TaskList", "TaxCalc", "TcpIp", "TeamChat", "TechStk",
    "Teleport", "TempFile", "TermCond", "TestUnit", "TextArea",
    "TextFlow", "ThemeDark", "ThickBrd", "ThinClient", "ThirdPty",
    "ThreadJs", "ThumbNail", "TickBox", "TileGrid", "TimeAxis",
    "TimeZone", "TinyMce", "TipBox", "TitleBar", "ToggleSw",
    "ToolBar", "ToolTip", "TopNav", "TouchEv", "TrackPtr",
    "TradeOff", "Traffic", "Transact", "Translat", "TrashBin",
    "TreeMenu", "TrendLn", "Trigger", "TrimStr", "TrueBool",
    "TrustScore", "TryCatch", "TubeVideo", "TunnelVis", "TurboChg",
    "TweetBox", "TwoFactor", "TypeAhead", "UiKit", "UltraHd",
    "UnDo", "Underline", "UniCode", "UnitTest", "UnLock",
    "UpArrow", "UpdateUI", "Upgrade", "UploadFl", "UrlBar",
    "UsbDrv", "UseState", "UserGrp", "UtilFunc", "UuidGen",
    "VacuumDb", "ValidChk", "Valuator", "VanillaJs", "VarDecl",
    "VaultSec", "VectorG", "VehiclTr", "VelocitY", "VentureCap",
    "VerifyOtp", "Version", "VertScroll", "VesselShip", "VetoRight",
    "VibrateOn", "VideoCam", "ViewPort", "VirtualDom", "VisaCard",
    "VisibleEl", "VisualStudio", "VoiceCmd", "VoltMeter", "VolumeCtrl",
    "VoteCount", "Voucher", "WebView", "WebSock", "WheelSpin",
    "WhereClause", "WhiteSpace", "WidgetBox", "WifiSignal", "WildCard",
    "WinPopup", "WireFrm", "WishList", "WizardStep", "WordWrap",
    "WorkFlow", "WriteLog", "WysiwygEd", "XmlHttp", "XPath",
    "YamlCfg", "YearPick", "ZeroState", "ZipCode", "ZoneMap"
]

# Fungsi untuk memastikan huruf ke-1 dan ke-5 adalah kapital
def format_component_name(word):
    if len(word) < 5:
        # Jika kata kurang dari 5 huruf, tambahkan karakter
        word = word + "X" * (5 - len(word))
    
    # Pastikan huruf pertama kapital
    result = word[0].upper() + word[1:4]
    
    # Pastikan huruf kelima kapital
    if len(word) >= 5:
        result += word[4].upper() + word[5:]
    else:
        result += word[4:].upper()
    
    return result

# Generate 1800 nama komponen unik
generated_names = set()
component_names = []

# Tambahkan variasi dengan prefix/suffix
prefixes = ["", "Super", "Ultra", "Mega", "Hyper", "Neo", "Pro", "Elite", "Prime", "Max"]
suffixes = ["", "Plus", "Pro", "Lite", "Basic", "Advanced", "Premium", "Gold", "Silver", "Titanium"]

for word in base_words:
    formatted = format_component_name(word)
    if formatted not in generated_names and len(generated_names) < 1800:
        generated_names.add(formatted)
        component_names.append(formatted)

# Jika belum mencapai 1800, buat kombinasi
counter = 1
while len(component_names) < 1800:
    for prefix in prefixes:
        for suffix in suffixes:
            for word in base_words[:50]:  # Ambil 50 kata pertama
                if len(component_names) >= 1800:
                    break
                
                if prefix and suffix:
                    combined = f"{prefix}{word}{suffix}"
                elif prefix:
                    combined = f"{prefix}{word}"
                elif suffix:
                    combined = f"{word}{suffix}"
                else:
                    combined = word
                
                formatted = format_component_name(combined)
                
                # Tambahkan angka jika duplikat
                original_formatted = formatted
                temp_counter = counter
                while formatted in generated_names:
                    formatted = f"{original_formatted}{temp_counter}"
                    temp_counter += 1
                
                if formatted not in generated_names:
                    generated_names.add(formatted)
                    component_names.append(formatted)
                    counter += 1
        
        if len(component_names) >= 1800:
            break
    
    if len(component_names) >= 1800:
        break

# Simpan nama-nama ke file
with open('/workspace/component_names.txt', 'w') as f:
    for name in component_names[:1800]:
        f.write(f"{name}\n")

print(f"Generated {len(component_names[:1800])} component names")
print("First 20 names:")
for name in component_names[:20]:
    print(f"  {name}")
