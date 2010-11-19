// How to generate the content of RAPThemeSupport.js:
// - Start an RAP-application (non-debug for client-side)
// - Open the application in an Firefox with Firebug 
// - In Firebug, go to "Html"
// - In the document, go to <body> -> <script>
// - Copy all calls that start with "qx.Theme.define("org.eclipse.swt.theme.Default..."
// - There should be 7 (there are several per row, maybe all in one)
// - Also copy the calls after that, "ts=org.eclipse.swt.theme.ThemeStore.getInstance();ts.defineValues..."
// - be careful not to copy line-numbers with the code
// - add the following lines: (without the "//")
//  qx.io.Alias.getInstance().add( "static", "../org.eclipse.rap.rwt.q07/js/resource/static" );
//  qx.io.Alias.getInstance().add( "org.eclipse.swt", "../org.eclipse.rap.rwt.q07/js/resource" );

qx.Theme.define("org.eclipse.swt.theme.DefaultColors",{title:"RAP Default Theme",colors:{}});
qx.Theme.define("org.eclipse.swt.theme.DefaultBorders",{title:"RAP Default Theme",extend:org.eclipse.swt.theme.BordersBase,borders:{}});
qx.Theme.define("org.eclipse.swt.theme.DefaultFonts",{title:"RAP Default Theme",fonts:{}});
qx.Theme.define("org.eclipse.swt.theme.DefaultIcons",{title:"RAP Default Theme",icons:{uri:"rwt-resources/resource/widget/rap"}});
qx.Theme.define("org.eclipse.swt.theme.DefaultWidgets",{title:"RAP Default Theme",widgets:{uri:"rwt-resources/resource/widget/rap"}});
qx.Theme.define("org.eclipse.swt.theme.DefaultAppearances",{title:"RAP Default Theme",extend:org.eclipse.swt.theme.AppearancesBase,appearances:{}});
qx.Theme.define("org.eclipse.swt.theme.Default",{title:"RAP Default Theme",meta:{"color":org.eclipse.swt.theme.DefaultColors,"border":org.eclipse.swt.theme.DefaultBorders,"font":org.eclipse.swt.theme.DefaultFonts,"icon":org.eclipse.swt.theme.DefaultIcons,"widget":org.eclipse.swt.theme.DefaultWidgets,"appearance":org.eclipse.swt.theme.DefaultAppearances}});
ts=org.eclipse.swt.theme.ThemeStore.getInstance();
ts.defineValues({"dimensions":{"0": 0,"40a": 22,"5e": 2,"34e": 18,"8d": 3,"bc": 4,"2f0": 16,"3db": 21,"eb": 5},"boxdims":{"1204d3a5": [4,5,4,5],"1203f6c4": [0,3,0,4],"120509bd": [5,5,5,5],"12043ca2": [1,10,1,10],"120462f3": [2,3,2,3],"120498c0": [3,3,0,0],"120450d9": [1,19,1,1],"120460b1": [2,2,2,1],"120460b2": [2,2,2,2],"12045c02": [2,0,0,2],"1203fb40": [0,5,0,0],"12042a9a": [1,2,1,2],"12042cf3": [1,3,2,3],"1204cf0b": [4,3,3,3],"1203f4b0": [0,2,2,0],"1203f480": [0,2,0,0],"1203f482": [0,2,0,2],"1205a000": [8,0,0,0],"12050bfe": [5,6,5,6],"12045c30": [2,0,2,0],"12046080": [2,2,0,0],"1204990b": [3,3,3,3],"1203f032": [0,0,2,2],"12046534": [2,4,2,4],"1203f030": [0,0,2,0],"1205a4b2": [8,2,2,2],"1203f000": [0,0,0,0],"1204d377": [4,5,2,7],"12050940": [5,5,0,0],"1204969c": [3,2,1,4],"1203fd80": [0,6,0,0],"12049b4c": [3,4,3,4],"12046775": [2,5,2,5]},"images":{"ed198000": null,"5efe3aa4": ["5efe3aa4",10,7],"b215a2e5": ["b215a2e5",11,11],"1e7357aa": ["1e7357aa",7,7],"df7ccd2b": ["df7ccd2b",16,5],"91dcf9c9": ["91dcf9c9",9,6],"dc3f170": ["dc3f170",6,9],"f9835c9c": ["f9835c9c",6,9],"7f9d166a": ["7f9d166a",11,11],"20ce8000": null,"361d46ab": ["361d46ab",16,16],"7a6be800": null,"3d543571": ["3d543571",10,7],"bf9cb6": ["bf9cb6",15,15],"ecca8c00": null,"ffffffff": null,"551f1d87": ["551f1d87",6,9],"e37249d4": ["e37249d4",32,32],"343b3df0": ["343b3df0",32,32],"6344dd7c": ["6344dd7c",15,15],"f281857c": ["f281857c",1,1600],"8ad6c431": ["8ad6c431",16,7],"9ae0f28": ["9ae0f28",15,15],"a6cd3400": null,"5310f593": ["5310f593",10,7],"ec3b45d8": ["ec3b45d8",11,11],"38e1b619": ["38e1b619",7,7],"903cec2d": ["903cec2d",16,16],"ec0d88bb": ["ec0d88bb",11,11],"6b1ea041": ["6b1ea041",6,9],"f92762a9": ["f92762a9",11,11],"19d00025": null,"96f80000": null,"4a0314a6": ["4a0314a6",15,15],"6181cefe": ["6181cefe",11,11],"d2e3902": ["d2e3902",10,7],"b2707000": null,"7c0538c2": ["7c0538c2",9,5],"9ee04c5a": ["9ee04c5a",9,6],"d2eb04f8": ["d2eb04f8",9,6],"b17f67f9": ["b17f67f9",15,15],"5f000025": null,"af6f6914": ["af6f6914",11,11],"b7351000": null,"d18fce93": ["d18fce93",9,6],"15180000": null,"63bd404f": ["63bd404f",11,11],"2607b23b": ["2607b23b",6,7],"7e94854d": ["7e94854d",15,15],"f1188849": ["f1188849",9,5],"b3abf2ab": ["b3abf2ab",9,6],"44404c00": null,"d40ced5e": ["d40ced5e",2,2],"9ece8000": null,"1f6c63f6": ["1f6c63f6",10,7],"4fb4e47": ["4fb4e47",13,13],"e1333cd8": ["e1333cd8",2,19],"5402a05a": ["5402a05a",16,16],"4f80000": null,"6e49954c": ["6e49954c",6,7],"66f5543e": ["66f5543e",6,7],"f7d3d3a4": ["f7d3d3a4",9,6],"9f000025": null,"f0f66998": ["f0f66998",6,9],"6da39160": ["6da39160",15,15],"3a888000": null,"528db58f": ["528db58f",6,7],"fa5acbe": ["fa5acbe",16,16],"fcf99fc5": ["fcf99fc5",7,4],"2282bd8b": ["2282bd8b",6,9],"38054a38": ["38054a38",32,32],"81f5b807": ["81f5b807",15,15],"37dc5d28": ["37dc5d28",32,32],"3698ef47": ["3698ef47",10,7],"6356c615": ["6356c615",15,15],"292499a9": ["292499a9",2,19],"42f14f4f": ["42f14f4f",15,15],"25ae5c00": null},"gradients":{"ed198000":{"percents": [0.0,52.0,100.0],"colors": ["#b0b0b0","#e0e0e0","#ffffff"],"vertical": true},"5efe3aa4": null,"b215a2e5": null,"1e7357aa": null,"df7ccd2b": null,"91dcf9c9": null,"dc3f170": null,"f9835c9c": null,"7f9d166a": null,"20ce8000":{"percents": [0.0,52.0,100.0],"colors": ["#e0e0e0","#e0e0e0","#b0b0b0"],"vertical": true},"361d46ab": null,"7a6be800":{"percents": [0.0,100.0],"colors": ["#a5a5a5","#858585"],"vertical": true},"3d543571": null,"bf9cb6": null,"ecca8c00":{"percents": [0.0,100.0],"colors": ["#e0e0e0","#ffffff"],"vertical": true},"ffffffff": null,"551f1d87": null,"e37249d4": null,"343b3df0": null,"6344dd7c": null,"f281857c": null,"8ad6c431": null,"9ae0f28": null,"a6cd3400":{"percents": [0.0,100.0],"colors": ["#595959","#4b4b4b"],"vertical": true},"5310f593": null,"ec3b45d8": null,"38e1b619": null,"903cec2d": null,"ec0d88bb": null,"6b1ea041": null,"f92762a9": null,"19d00025":{"percents": [0.0,52.0,100.0],"colors": ["#e0e0e0","#e0e0e0","#b0b0b0"],"vertical": false},"96f80000":{"percents": [0.0,48.0,52.0,100.0],"colors": ["#ffffff","#f0f0f0","#e0e0e0","#ffffff"],"vertical": true},"4a0314a6": null,"6181cefe": null,"d2e3902": null,"b2707000":{"percents": [0.0,100.0],"colors": ["#dae9f7","#d2e0ee"],"vertical": true},"7c0538c2": null,"9ee04c5a": null,"d2eb04f8": null,"b17f67f9": null,"5f000025":{"percents": [0.0,52.0,56.0,100.0],"colors": ["#cccccc","#e0e0e0","#f0f0f0","#ffffff"],"vertical": false},"af6f6914": null,"b7351000":{"percents": [0.0,100.0],"colors": ["#ffffff","#e0e0e0"],"vertical": true},"d18fce93": null,"15180000":{"percents": [0.0,30.0,70.0,100.0],"colors": ["#e0e0e0","#f0f0f0","#e0e0e0","#b0b0b0"],"vertical": true},"63bd404f": null,"2607b23b": null,"7e94854d": null,"f1188849": null,"b3abf2ab": null,"44404c00":{"percents": [0.0,100.0],"colors": ["#0078bf","#00589f"],"vertical": true},"d40ced5e": null,"9ece8000":{"percents": [0.0,52.0,100.0],"colors": ["#ffffff","#e0e0e0","#b0b0b0"],"vertical": true},"1f6c63f6": null,"4fb4e47": null,"e1333cd8": null,"5402a05a": null,"4f80000":{"percents": [0.0,48.0,52.0,100.0],"colors": ["#ffffff","#f0f0f0","#e0e0e0","#cccccc"],"vertical": true},"6e49954c": null,"66f5543e": null,"f7d3d3a4": null,"9f000025":{"percents": [0.0,48.0,52.0,100.0],"colors": ["#ffffff","#f0f0f0","#e0e0e0","#cccccc"],"vertical": false},"f0f66998": null,"6da39160": null,"3a888000":{"percents": [0.0,55.0,100.0],"colors": ["#ffffff","#e0e0e0","#f0f0f0"],"vertical": true},"528db58f": null,"fa5acbe": null,"fcf99fc5": null,"2282bd8b": null,"38054a38": null,"81f5b807": null,"37dc5d28": null,"3698ef47": null,"6356c615": null,"292499a9": null,"42f14f4f": null,"25ae5c00":{"percents": [0.0,100.0],"colors": ["#005fac","#005092"],"vertical": true}},"colors":{"0": "#000000","f7e9da": "#dae9f7","3cc8fe": "#fec83c","808080": "#808080","ffffffff": "undefined","e4dfdc": "#dcdfe4","959595": "#959595","9f5800": "#00589f","aaaaaa": "#aaaaaa","a4a4a4": "#a4a4a4","99a8ac": "#aca899","f4f3f3": "#f3f3f4","cfcfcf": "#cfcfcf","9c5600": "#00569c","c0c0c0": "#c0c0c0","fff8f8": "#f8f8ff","4a4a4a": "#4a4a4a","aaa6a7": "#a7a6aa","2020cb": "#cb2020","e6e1e1": "#e1e1e6","dedede": "#dedede","8c8785": "#85878c","d2d2d2": "#d2d2d2","d0d0d0": "#d0d0d0","ebebeb": "#ebebeb","666666": "#666666","a55900": "#0059a5","a59679": "#7996a5","4e4a46": "#464a4e","c08000": "#0080c0","fcfcfc": "#fcfcfc","ffffff": "#ffffff","f3e3d9": "#d9e3f3"},"fonts":{"dee31769":{"family": ["Verdana","Lucida Sans","Arial","Helvetica","sans-serif"],"size": 12,"bold": false,"italic": false},"67d9a7ad":{"family": ["Segoe UI","Corbel","Calibri","Tahoma","Lucida Sans Unicode"],"size": 11,"bold": false,"italic": false},"c9a2fa1":{"family": ["Verdana","Lucida Sans","Arial","Helvetica","sans-serif"],"size": 11,"bold": true,"italic": false},"dee311c5":{"family": ["Verdana","Lucida Sans","Arial","Helvetica","sans-serif"],"size": 11,"bold": false,"italic": false}},"borders":{"dfa628db":{"width": 1,"style": "solid","color": "#c1c1c1"},"dc65e06a":{"width": 1,"style": "solid","color": "#a4a4a4"},"887c1e69":{"width": 1,"style": "solid","color": "#0059a5"},"dc902e9c":{"width": 1,"style": "solid","color": "#a7a6aa"},"c411a436":{"width": 1,"style": "outset","color": null},"e2677bf1":{"width": 1,"style": "solid","color": "#cccccc"},"8879b0d1":{"width": 1,"style": "solid","color": "#000000"},"36a":{"width": 0,"style": null,"color": null},"5fbe325":{"width": 2,"style": "inset","color": null},"887bfd69":{"width": 2,"style": "solid","color": "#005092"},"92103dff":{"width": 2,"style": "solid","color": "#4b4b4b"},"2abfdf6d":{"width": 1,"style": "dotted","color": "#b8b8b8"},"5fbe2ff":{"width": 1,"style": "inset","color": null},"887c1601":{"width": 1,"style": "solid","color": "#00589f"}},"cursors":{"e81f3e3d": "pointer","5c13d641": "default"},"animations":{"7":{},"4bbf04cf":{"fadeIn": [200,"linear"],"fadeOut": [400,"easeOut"]},"6d3dee97":{"hoverOut": [500,"easeOut"]},"4bbf0fbf":{"fadeIn": [200,"linear"],"fadeOut": [600,"easeOut"]}}});
ts.setThemeCssValues("org.eclipse.swt.theme.Default",{"Spinner-DownButton":{"background-image": [[[":pressed"],"ed198000"],[[],"ecca8c00"]],"background-color": [[[],"ffffffff"]],"border": [[[],"36a"]],"border-radius": [[[],"1203f030"]],"cursor": [[[],"5c13d641"]],"width": [[[],"34e"]]},"DateTime-DropDownButton":{"background-image": [[[],"4f80000"]],"background-color": [[[],"ffffffff"]],"border": [[[],"36a"]],"border-radius": [[[],"1203f4b0"]],"cursor": [[[],"5c13d641"]],"width": [[[],"34e"]]},"CoolBar":{"background-image": [[[],"ffffffff"]]},"TreeColumn":{"background-color": [[[],"fff8f8"]],"background-image": [[[":hover"],"e1333cd8"],[[],"292499a9"]],"border-bottom": [[[":hover"],"36a"],[[],"36a"]],"padding": [[[],"12042a9a"]]},"ExpandItem-Button":{"background-image": [[[":expanded",":hover"],"903cec2d"],[[":expanded"],"fa5acbe"],[[":hover"],"5402a05a"],[[],"361d46ab"]]},"Spinner-UpButton":{"background-image": [[[":pressed"],"9ece8000"],[[],"b7351000"]],"background-color": [[[],"ffffffff"]],"border": [[[],"36a"]],"border-radius": [[[],"1203f480"]],"cursor": [[[],"5c13d641"]],"width": [[[],"34e"]]},"Group":{"background-color": [[[],"ffffff"]],"color": [[[":disabled"],"cfcfcf"],[[],"4a4a4a"]],"font": [[[],"dee31769"]],"border": [[["[BORDER"],"5fbe325"],[[],"36a"]]},"Label-SeparatorLine":{"border": [[["[SHADOW_OUT"],"c411a436"],[["[SHADOW_IN"],"5fbe2ff"],[[],"dc65e06a"]],"border-radius": [[[],"1203f000"]],"background-color": [[[],"ffffffff"]],"background-image": [[[],"ffffffff"]],"width": [[[],"5e"]]},"Slider-UpButton":{"background-color": [[["[VERTICAL"],"ffffffff"],[["[HORIZONTAL"],"ffffffff"],[[],"fff8f8"]],"border": [[["[VERTICAL"],"dc65e06a"],[["[HORIZONTAL"],"dc65e06a"],[[],"c411a436"]],"border-radius": [[["[VERTICAL"],"1203f032"],[["[HORIZONTAL"],"1203f4b0"]],"background-image": [[[":pressed","[VERTICAL"],"19d00025"],[[":pressed","[HORIZONTAL"],"20ce8000"],[["[VERTICAL"],"5f000025"],[["[HORIZONTAL"],"4f80000"],[[],"ffffffff"]],"cursor": [[[],"5c13d641"]]},"DateTime":{"color": [[[":disabled"],"cfcfcf"],[[],"4e4a46"]],"background-color": [[[],"fcfcfc"]],"font": [[[],"dee311c5"]],"border": [[["[BORDER"],"dc65e06a"],[[],"dc65e06a"]],"border-radius": [[["[BORDER"],"120460b2"],[[],"120460b2"]],"padding": [[[],"12042a9a"]]},"Tree-Cell":{"padding": [[[],"1203f482"]],"spacing": [[[],"8d"]]},"Slider-DownButton":{"background-color": [[["[VERTICAL"],"ffffffff"],[["[HORIZONTAL"],"ffffffff"],[[],"fff8f8"]],"border": [[["[VERTICAL"],"dc65e06a"],[["[HORIZONTAL"],"dc65e06a"],[[],"c411a436"]],"border-radius": [[["[VERTICAL"],"12046080"],[["[HORIZONTAL"],"12045c02"]],"background-image": [[[":pressed","[VERTICAL"],"19d00025"],[[":pressed","[HORIZONTAL"],"20ce8000"],[["[VERTICAL"],"9f000025"],[["[HORIZONTAL"],"4f80000"],[[],"ffffffff"]],"cursor": [[[],"5c13d641"]]},"CCombo-Button":{"background-image": [[[":pressed"],"20ce8000"],[[],"4f80000"]],"background-color": [[[],"ffffffff"]],"border": [[[":hover","[FLAT"],"c411a436"],[["[FLAT"],"36a"],[[],"36a"]],"border-radius": [[[],"1203f4b0"]],"cursor": [[[],"5c13d641"]],"width": [[[],"34e"]]},"Shell":{"border": [[[":inactive",":maximized"],"36a"],[[":inactive","[TITLE"],"92103dff"],[[":inactive","[BORDER"],"92103dff"],[[":maximized"],"36a"],[["[BORDER"],"887bfd69"],[["[TITLE"],"887bfd69"],[[],"8879b0d1"]],"border-radius": [[["[BORDER"],"12050940"],[["[TITLE"],"12050940"]],"background-image": [[[],"ffffffff"]],"padding": [[["[BORDER"],"120509bd"],[["[TITLE"],"120509bd"],[[],"1203f000"]],"background-color": [[["[BORDER"],"ffffff"],[["[TITLE"],"ffffff"],[[],"ffffff"]],"opacity": [[[],"1.0"]]},"Combo":{"color": [[[":disabled"],"cfcfcf"],[[],"4e4a46"]],"background-color": [[[],"fcfcfc"]],"font": [[[],"dee311c5"]],"border": [[[],"dfa628db"]],"border-radius": [[[],"120460b2"]]},"ExpandItem-Header":{"background-color": [[[],"ffffff"]],"background-image": [[[],"3a888000"]],"border": [[[],"36a"]],"border-radius": [],"cursor": [[[":disabled"],"5c13d641"],[[],"e81f3e3d"]]},"Combo-Button":{"background-image": [[[":pressed"],"20ce8000"],[[],"4f80000"]],"background-color": [[[],"ffffffff"]],"border": [[[],"36a"]],"border-radius": [[[],"1203f4b0"]],"cursor": [[[],"5c13d641"]],"width": [[[],"34e"]]},"ToolItem-DropDownIcon":{"background-image": [[[],"fcf99fc5"]],"border": [[[":hover"],"5fbe2ff"],[[],"36a"]]},"DateTime-Calendar-Day":{"color": [[[":hover",":selected"],"ffffff"],[[":otherMonth"],"808080"],[[":selected"],"4a4a4a"],[[],"4a4a4a"]],"background-color": [[[":selected",":unfocused"],"c0c0c0"],[[":hover",":selected"],"9c5600"],[[":hover"],"f3e3d9"],[[":otherMonth"],"ffffffff"],[[":selected"],"d2d2d2"],[[],"ffffff"]]},"TableItem":{"color": [[[":even",":linesvisible",":selected",":unfocused"],"ffffff"],[[":even",":linesvisible",":selected"],"ffffff"],[[":selected",":unfocused"],"ffffff"],[[":selected"],"ffffff"],[[":disabled"],"cfcfcf"],[[],"ffffffff"]],"background-color": [[[":even",":linesvisible",":selected",":unfocused"],"959595"],[[":even",":linesvisible",":selected"],"9f5800"],[[":even",":hover",":linesvisible"],"f7e9da"],[[":even",":linesvisible"],"f4f3f3"],[[":selected",":unfocused"],"959595"],[[":selected"],"9f5800"],[[":hover"],"f7e9da"],[[],"ffffffff"]]},"*":{"color": [[[":disabled"],"cfcfcf"],[[],"4a4a4a"]],"background-color": [[[],"ffffff"]],"background-image": [[[],"ffffffff"]],"font": [[[],"dee31769"]],"border": [[["[BORDER"],"5fbe325"],[[],"36a"]],"padding": [[[],"1203f000"]]},"Tree-GridLine":{"color": [[[":horizontal"],"ffffffff"],[[],"d0d0d0"]]},"CCombo-Button-Icon":{"background-image": [[[":hover"],"d2eb04f8"],[[],"91dcf9c9"]]},"Combo-Button-Icon":{"background-image": [[[":hover"],"d2eb04f8"],[[],"91dcf9c9"]]},"DateTime-UpButton-Icon":{"background-image": [[[":hover"],"d18fce93"],[[],"f7d3d3a4"]]},"Sash":{},"TabItem":{"background-color": [[[":hover"],"f7e9da"],[[":selected"],"ffffff"],[[],"ffffff"]],"background-image": [[[":hover"],"ffffffff"],[[":selected"],"ffffffff"],[[],"ffffffff"]],"border-top-color": [[[":selected"],"9f5800"],[[],"ffffff"]],"border-bottom-color": [[[":selected"],"9f5800"],[[],"ffffff"]]},"ToolItem-Separator":{"width": [[[],"bc"]]},"TableColumn-SortIndicator":{"background-image": [[[":down"],"f1188849"],[[":up"],"7c0538c2"],[[],"ffffffff"]]},"ProgressBar":{"background-color": [[[],"ffffff"]],"background-image": [[[],"ffffffff"]],"border": [[[],"dc65e06a"]],"border-radius": [[[],"120460b2"]]},"Group-Frame":{"border": [[[],"e2677bf1"]],"border-radius": [[[],"120460b2"]],"margin": [[[],"1205a000"]],"padding": [[[],"1205a4b2"]]},"TreeColumn-SortIndicator":{"background-image": [[[":down"],"f1188849"],[[":up"],"7c0538c2"],[[],"ffffffff"]]},"Shell-MinButton":{"margin": [[[":inactive"],"1203fd80"],[[],"1203fd80"]],"background-image": [[[":hover",":inactive"],"ec3b45d8"],[[":inactive"],"f92762a9"],[[":hover"],"ec3b45d8"],[[],"f92762a9"]]},"TableColumn":{"color": [[[":disabled"],"cfcfcf"],[[],"666666"]],"font": [[[],"dee31769"]],"background-color": [[[],"fff8f8"]],"background-image": [[[":hover"],"e1333cd8"],[[],"292499a9"]],"border-bottom": [[[":hover"],"36a"],[[],"36a"]],"padding": [[[],"12042a9a"]]},"CTabItem":{"font": [[[],"dee31769"]],"color": [[[":disabled"],"0"],[[":selected"],"ffffff"],[[],"4a4a4a"]],"background-color": [[[":selected"],"9f5800"],[[],"ffffff"]],"background-image": [[[],"ffffffff"]],"padding": [[[],"12046534"]],"spacing": [[[],"bc"]]},"Combo-Field":{"padding": [[[],"120462f3"]]},"Table":{"color": [[[":disabled"],"cfcfcf"],[[],"4a4a4a"]],"background-color": [[[],"ffffff"]],"background-image": [[[],"ffffffff"]]},"Text-Message":{"color": [[[],"aaa6a7"]]},"Slider-DownButton-Icon":{"background-image": [[[":hover","[VERTICAL"],"d18fce93"],[[":hover","[HORIZONTAL"],"551f1d87"],[["[VERTICAL"],"f7d3d3a4"],[["[HORIZONTAL"],"f0f66998"],[[],"ffffffff"]]},"Spinner-Field":{"padding": [[[],"120462f3"]]},"Tree":{"color": [[[":disabled"],"cfcfcf"],[[],"4a4a4a"]],"background-color": [[[],"ffffff"]],"border": [[["[BORDER"],"5fbe325"],[[],"36a"]]},"DateTime-Calendar-PreviousYearButton":{"background-image": [[[":hover"],"1f6c63f6"],[[],"3698ef47"]],"cursor": [[[],"5c13d641"]]},"List-Item":{"color": [[[":even",":selected",":unfocused"],"ffffff"],[[":even",":selected"],"ffffff"],[[":selected",":unfocused"],"ffffff"],[[":selected"],"ffffff"],[[":disabled"],"cfcfcf"],[[],"ffffffff"]],"background-color": [[[":even",":selected",":unfocused"],"959595"],[[":even",":selected"],"9f5800"],[[":even",":hover"],"f7e9da"],[[":selected",":unfocused"],"959595"],[[":even"],"f4f3f3"],[[":selected"],"9f5800"],[[":hover"],"f7e9da"],[[],"ffffffff"]],"background-image": [[[":even",":selected",":unfocused"],"7a6be800"],[[":even",":selected"],"44404c00"],[[":selected",":unfocused"],"7a6be800"],[[":selected"],"44404c00"],[[":hover"],"b2707000"],[[],"ffffffff"]]},"Scale-Thumb":{"background-color": [[[],"9f5800"]]},"Link":{"font": [[[],"dee31769"]],"border": [[["[BORDER"],"5fbe325"],[[],"36a"]]},"Button-CheckIcon":{"background-image": [[[":grayed",":hover",":selected"],"bf9cb6"],[[":grayed",":selected"],"81f5b807"],[[":hover",":selected"],"42f14f4f"],[[":selected"],"6da39160"],[[":hover"],"9ae0f28"],[[],"b17f67f9"]]},"Table-GridLine":{"color": [[[":horizontal"],"ffffffff"],[[],"dedede"]]},"Shell-CloseButton":{"margin": [[[":inactive"],"1203fb40"],[[],"1203fb40"]],"background-image": [[[":hover",":inactive"],"6181cefe"],[[":inactive"],"63bd404f"],[[":hover"],"6181cefe"],[[],"63bd404f"]]},"DateTime-DownButton-Icon":{"background-image": [[[":hover"],"9ee04c5a"],[[],"b3abf2ab"]]},"Label":{"color": [[[":disabled"],"cfcfcf"],[[],"4a4a4a"]],"background-color": [[[],"ffffff"]],"font": [[[],"dee31769"]],"border": [[["[BORDER"],"5fbe2ff"],[[],"36a"]],"border-radius": [],"cursor": [[[],"5c13d641"]],"background-image": [[[],"ffffffff"]],"text-decoration": [[[],"none"]],"opacity": [[[],"1.0"]]},"Shell-Titlebar":{"color": [[[":inactive"],"aaaaaa"],[[],"ffffff"]],"background-color": [[[":inactive"],"a59679"],[[],"c08000"]],"background-gradient-color": [[[":inactive"],"a59679"],[[],"c08000"]],"background-image": [[[":inactive"],"a6cd3400"],[[],"25ae5c00"]],"font": [[[],"dee31769"]],"margin": [[[],"1203f000"]],"padding": [[[],"12046775"]],"height": [[[],"40a"]],"border": [[[],"36a"]],"border-radius": [[[],"120498c0"]]},"Tree-Indent":{"width": [[[],"2f0"]],"background-image": [[[":expanded",":first",":hover",":last"],"38e1b619"],[[":collapsed",":first",":hover",":last"],"2282bd8b"],[[":expanded",":first",":last"],"1e7357aa"],[[":collapsed",":first",":last"],"f9835c9c"],[[":expanded",":hover",":last"],"38e1b619"],[[":collapsed",":hover",":last"],"2282bd8b"],[[":expanded",":first",":hover"],"38e1b619"],[[":collapsed",":first",":hover"],"2282bd8b"],[[":first",":last"],"ffffffff"],[[":expanded",":last"],"1e7357aa"],[[":collapsed",":last"],"f9835c9c"],[[":expanded",":first"],"1e7357aa"],[[":collapsed",":first"],"f9835c9c"],[[":expanded",":hover"],"38e1b619"],[[":collapsed",":hover"],"2282bd8b"],[[":last"],"ffffffff"],[[":first"],"ffffffff"],[[":line"],"ffffffff"],[[":expanded"],"1e7357aa"],[[":collapsed"],"f9835c9c"],[[],"ffffffff"]]},"Combo-List":{"border": [[[],"dfa628db"]],"border-radius": [[[],"1203f032"]]},"Combo-FocusIndicator":{"background-color": [[[],"ffffffff"]],"border": [[[],"2abfdf6d"]],"margin": [[[],"120450d9"]],"opacity": [[[],"1.0"]]},"DateTime-DownButton":{"background-image": [[[":pressed"],"ed198000"],[[],"ecca8c00"]],"background-color": [[[],"ffffffff"]],"border": [[[],"36a"]],"border-radius": [[[],"1203f030"]],"cursor": [[[],"5c13d641"]],"width": [[[],"34e"]]},"Link-Hyperlink":{"color": [[[":disabled"],"959595"],[[],"9f5800"]]},"Spinner":{"color": [[[":disabled"],"cfcfcf"],[[],"4e4a46"]],"background-color": [[[],"fcfcfc"]],"font": [[[],"dee31769"]],"border": [[["[BORDER"],"dc65e06a"],[[],"36a"]],"border-radius": [[["[BORDER"],"120460b2"]],"padding": [[[],"12042a9a"]]},"MenuItem-CascadeIcon":{"background-image": [[[],"4fb4e47"]]},"ToolItem":{"color": [[[":disabled"],"cfcfcf"],[[],"ffffffff"]],"background-color": [[[":hover"],"ffffff"],[[],"ffffffff"]],"background-image": [[[":selected"],"d40ced5e"],[[":pressed"],"d40ced5e"],[[],"ffffffff"]],"border": [[[":selected"],"5fbe2ff"],[[":pressed"],"5fbe2ff"],[[":hover"],"dc65e06a"],[["[FLAT"],"36a"],[[],"36a"]],"border-radius": [[[":hover"],"120460b2"],[[],"1203f000"]],"animation": [[[],"7"]],"spacing": [[[],"bc"]],"padding": [[[":selected"],"1204969c"],[[":pressed"],"1204969c"],[[":hover"],"120462f3"],[["[FLAT"],"12049b4c"],[[],"120462f3"]],"opacity": [[[],"1.0"]]},"CTabFolder":{"border-color": [[[],"a4a4a4"]],"border-radius": [[[],"120460b2"]]},"Tree-Checkbox":{"margin": [[[],"1203f480"]],"background-image": [[[":checked",":grayed",":hover"],"bf9cb6"],[[":checked",":grayed"],"81f5b807"],[[":checked",":hover"],"42f14f4f"],[[":checked"],"6da39160"],[[":hover"],"9ae0f28"],[[],"b17f67f9"]]},"Menu":{"color": [[[":disabled"],"cfcfcf"],[[],"a55900"]],"background-color": [[[],"ffffff"]],"background-image": [[[],"ffffffff"]],"font": [[[],"dee31769"]],"border": [[[],"887c1e69"]],"border-radius": [[[],"120460b2"]],"opacity": [[[],"1.0"]],"padding": [[[],"12045c30"]],"animation": [[[],"7"]]},"TabFolder":{},"Button":{"color": [[[":disabled"],"cfcfcf"],[[],"4a4a4a"]],"background-color": [[[":selected","[FLAT","[TOGGLE"],"e6e1e1"],[[":pressed","[FLAT","[TOGGLE"],"e6e1e1"],[[":pressed","[FLAT","[PUSH"],"e6e1e1"],[[],"ffffff"]],"background-image": [[[":hover",":selected","[TOGGLE"],"20ce8000"],[["[BORDER","[RADIO"],"ffffffff"],[["[BORDER","[CHECK"],"ffffffff"],[[":selected","[TOGGLE"],"15180000"],[[":pressed","[TOGGLE"],"20ce8000"],[[":pressed","[PUSH"],"20ce8000"],[[":hover","[TOGGLE"],"4f80000"],[[":hover","[PUSH"],"4f80000"],[["[BORDER"],"96f80000"],[["[TOGGLE"],"96f80000"],[["[PUSH"],"96f80000"],[[],"ffffffff"]],"border": [[["[FLAT","[TOGGLE"],"8879b0d1"],[["[FLAT","[PUSH"],"8879b0d1"],[["[BORDER"],"dc65e06a"],[["[TOGGLE"],"dc65e06a"],[["[PUSH"],"dc65e06a"],[[],"36a"]],"border-radius": [[["[BORDER"],"1204990b"],[["[TOGGLE"],"1204990b"],[["[PUSH"],"1204990b"]],"animation": [[[":pressed","[TOGGLE"],"7"],[[":pressed","[PUSH"],"7"],[["[BORDER"],"6d3dee97"],[["[TOGGLE"],"6d3dee97"],[["[PUSH"],"6d3dee97"],[[],"7"]],"cursor": [[[":disabled","[TOGGLE"],"5c13d641"],[[":disabled","[PUSH"],"5c13d641"],[["[BORDER"],"e81f3e3d"],[["[TOGGLE"],"e81f3e3d"],[["[PUSH"],"e81f3e3d"],[[],"5c13d641"]],"padding": [[[":selected","[FLAT","[TOGGLE"],"12050bfe"],[[":pressed","[FLAT","[TOGGLE"],"12050bfe"],[[":pressed","[FLAT","[PUSH"],"12050bfe"],[[":pressed","[TOGGLE"],"1204d377"],[[":pressed","[PUSH"],"1204d377"],[["[FLAT","[TOGGLE"],"12050bfe"],[["[FLAT","[PUSH"],"12050bfe"],[["[BORDER"],"12046775"],[["[TOGGLE"],"12046775"],[["[PUSH"],"12046775"],[[],"1204d3a5"]],"spacing": [[["[RADIO"],"bc"],[["[CHECK"],"bc"],[[],"5e"]],"font": [[[],"dee31769"]]},"CLabel":{"color": [[[":disabled"],"cfcfcf"],[[],"4a4a4a"]],"background-color": [[[],"ffffff"]],"font": [[[],"dee31769"]],"border": [[["[BORDER"],"5fbe2ff"],[[],"36a"]],"border-radius": [],"cursor": [[[],"5c13d641"]],"background-image": [[[],"ffffffff"]],"padding": [[[],"1204990b"]],"spacing": [[[],"eb"]],"opacity": [[[],"1.0"]]},"MenuItem-CheckIcon":{"background-image": [[[],"8ad6c431"]]},"Scale":{"background-color": [[[],"ffffff"]],"border": [[["[BORDER"],"5fbe325"],[[],"36a"]],"border-radius": []},"ToolTip":{"color": [[[],"4a4a4a"]],"background-color": [[[],"f7e9da"]],"border": [[[],"887c1601"]],"border-radius": [[[],"120460b2"]],"background-image": [[[],"ffffffff"]],"padding": [[[],"12042cf3"]],"font": [[[],"dee31769"]],"opacity": [[[],"1.0"]],"animation": [[[],"4bbf0fbf"]]},"Slider-Thumb":{"background-color": [[[],"ffffffff"]],"border": [[[],"dc65e06a"]],"border-radius": [[[],"120460b2"]],"background-image": [[[":pressed"],"20ce8000"],[["[HORIZONTAL"],"4f80000"],[["[VERTICAL"],"9f000025"],[[],"ffffffff"]]},"CCombo-List":{"border": [[[],"dfa628db"]],"border-radius": [[[],"1203f032"]]},"Display":{"rwt-shadow-color": [[[],"aaa6a7"]],"rwt-highlight-color": [[[],"ffffff"]],"rwt-darkshadow-color": [[[],"8c8785"]],"rwt-lightshadow-color": [[[],"e4dfdc"]],"rwt-thinborder-color": [[[],"99a8ac"]],"rwt-selectionmarker-color": [[[],"3cc8fe"]],"rwt-infobackground-color": [[[],"ffffff"]],"rwt-error-image": [[[],"e37249d4"]],"rwt-information-image": [[[],"38054a38"]],"rwt-working-image": [],"rwt-question-image": [[[],"343b3df0"]],"rwt-warning-image": [[[],"37dc5d28"]],"rwt-fontlist": [[[],"67d9a7ad"]],"background-image": [[[],"f281857c"]],"font": [[[],"dee31769"]]},"ToolBar":{"color": [[[":disabled"],"cfcfcf"],[[],"0"]],"background-color": [[[],"ffffff"]],"background-image": [[[],"ffffffff"]],"padding": [[[],"1203f000"]],"spacing": [[[],"0"]],"border": [[["[BORDER"],"c411a436"],[[],"36a"]],"opacity": [[[],"1.0"]]},"ExpandBar":{"color": [[[":disabled"],"cfcfcf"],[[],"4a4a4a"]],"font": [[[],"dee31769"]],"border": [[["[BORDER"],"dfa628db"],[[],"36a"]],"border-radius": []},"Button-RadioIcon":{"background-image": [[[":hover",":selected"],"6344dd7c"],[[":selected"],"7e94854d"],[[":hover"],"6356c615"],[[],"4a0314a6"]]},"DateTime-DropDownCalendar":{"border": [[[],"dc902e9c"]]},"DateTime-Field":{"color": [[[":selected"],"4a4a4a"],[[],"4a4a4a"]],"background-color": [[[":selected"],"d2d2d2"],[[],"ffffff"]],"padding": [[[],"120462f3"]]},"DateTime-Calendar-NextYearButton":{"background-image": [[[":hover"],"5310f593"],[[],"5efe3aa4"]],"cursor": [[[],"5c13d641"]]},"DateTime-Calendar-NextMonthButton":{"background-image": [[[":hover"],"66f5543e"],[[],"528db58f"]],"cursor": [[[],"5c13d641"]]},"CCombo":{"color": [[[":disabled"],"cfcfcf"],[[],"4e4a46"]],"background-color": [[[],"fcfcfc"]],"font": [[[],"dee311c5"]],"border": [[["[BORDER"],"dfa628db"],[[],"36a"]],"border-radius": [[["[BORDER"],"120460b2"],[[],"120460b2"]]},"CCombo-FocusIndicator":{"background-color": [[[],"ffffffff"]],"border": [[[],"2abfdf6d"]],"margin": [[[],"120450d9"]],"opacity": [[[],"1.0"]]},"Composite":{"border": [[["[BORDER"],"5fbe325"],[[],"36a"]],"border-radius": [],"background-color": [[["[BORDER"],"ffffff"],[[],"ffffff"]],"background-image": [[["[BORDER"],"ffffffff"],[[],"ffffffff"]],"padding": [[[],"1203f000"]],"opacity": [[[],"1.0"]]},"MenuItem-RadioIcon":{"background-image": [[[],"df7ccd2b"]]},"Slider-UpButton-Icon":{"background-image": [[[":hover","[VERTICAL"],"9ee04c5a"],[[":hover","[HORIZONTAL"],"dc3f170"],[["[VERTICAL"],"b3abf2ab"],[["[HORIZONTAL"],"6b1ea041"],[[],"ffffffff"]]},"Group-Label":{"border": [[[],"36a"]],"border-radius": [],"padding": [[[],"1203f6c4"]],"margin": [[[],"12043ca2"]],"background-color": [[[],"ffffffff"]],"color": [[[],"4e4a46"]]},"Table-Checkbox":{"width": [[[],"3db"]],"margin": [[[],"1203f000"]],"background-image": [[[":checked",":grayed",":hover"],"bf9cb6"],[[":checked",":grayed"],"81f5b807"],[[":checked",":hover"],"42f14f4f"],[[":checked"],"6da39160"],[[":hover"],"9ae0f28"],[[],"b17f67f9"]]},"TreeItem":{"color": [[[":even",":linesvisible",":selected",":unfocused"],"ffffff"],[[":even",":linesvisible",":selected"],"ffffff"],[[":selected",":unfocused"],"ffffff"],[[":selected"],"ffffff"],[[":disabled"],"cfcfcf"],[[],"ffffffff"]],"background-color": [[[":even",":linesvisible",":selected",":unfocused"],"959595"],[[":even",":linesvisible",":selected"],"9f5800"],[[":even",":hover",":linesvisible"],"f7e9da"],[[":even",":linesvisible"],"f4f3f3"],[[":selected",":unfocused"],"959595"],[[":selected"],"9f5800"],[[":hover"],"f7e9da"],[[],"ffffffff"]]},"DateTime-DropDownButton-Icon":{"background-image": [[[":hover"],"9ee04c5a"],[[],"b3abf2ab"]]},"Slider":{"background-color": [[[],"f4f3f3"]],"border": [[[],"36a"]],"border-radius": []},"Browser":{"border": [[["[BORDER"],"5fbe325"],[[],"36a"]]},"DateTime-Calendar-Navbar":{"border": [[[],"36a"]],"border-radius": [],"color": [[[":disabled"],"cfcfcf"],[[],"ffffff"]],"background-color": [[[],"9c5600"]],"font": [[[],"c9a2fa1"]]},"CoolItem-Handle":{"border": [[[],"c411a436"]],"width": [[[],"bc"]]},"List":{"font": [[[],"dee31769"]],"color": [[[":disabled"],"cfcfcf"],[[],"4a4a4a"]],"background-color": [[[],"ffffff"]],"border": [[["[BORDER"],"5fbe2ff"],[[],"36a"]]},"DateTime-UpButton":{"background-image": [[[":pressed"],"9ece8000"],[[],"b7351000"]],"background-color": [[[],"ffffffff"]],"border": [[[],"36a"]],"border-radius": [[[],"1203f480"]],"cursor": [[[],"5c13d641"]],"width": [[[],"34e"]]},"Shell-DisplayOverlay":{"background-color": [[[],"808080"]],"background-image": [[[],"ffffffff"]],"animation": [[[],"4bbf04cf"]],"opacity": [[[],"0.2"]]},"Button-FocusIndicator":{"background-color": [[["[RADIO"],"ffffffff"],[["[CHECK"],"ffffffff"],[["[TOGGLE"],"ffffffff"],[["[PUSH"],"ffffffff"],[[],"ffffff"]],"border": [[["[RADIO"],"2abfdf6d"],[["[CHECK"],"2abfdf6d"],[["[TOGGLE"],"2abfdf6d"],[["[PUSH"],"2abfdf6d"],[["[BORDER"],"5fbe325"],[[],"36a"]],"padding": [[["[RADIO"],"120460b1"],[["[CHECK"],"120460b1"],[["[TOGGLE"],"1203f000"],[["[PUSH"],"1203f000"],[[],"1203f000"]],"margin": [[["[RADIO"],"1203f000"],[["[CHECK"],"1203f000"],[["[TOGGLE"],"120460b2"],[["[PUSH"],"120460b2"]],"opacity": [[["[RADIO"],"1.0"],[["[CHECK"],"1.0"],[["[TOGGLE"],"1.0"],[["[PUSH"],"1.0"]]},"Sash-Handle":{"background-image": [[[":vertical"],"ffffffff"],[[":horizontal"],"ffffffff"],[[],"ffffffff"]]},"CTabFolder-DropDownButton-Icon":{"background-image": [[[":hover"],"3d543571"],[[],"d2e3902"]]},"DateTime-Calendar-PreviousMonthButton":{"background-image": [[[":hover"],"2607b23b"],[[],"6e49954c"]],"cursor": [[[],"5c13d641"]]},"Spinner-DownButton-Icon":{"background-image": [[[":hover"],"9ee04c5a"],[[],"b3abf2ab"]]},"Table-Cell":{"padding": [[[],"1204cf0b"]],"spacing": [[[],"8d"]]},"Text":{"color": [[[":disabled"],"cfcfcf"],[[],"4e4a46"]],"background-color": [[[],"fcfcfc"]],"font": [[[],"dee31769"]],"border": [[["[BORDER"],"dc65e06a"],[[],"36a"]],"border-radius": [[["[BORDER"],"120460b2"]],"background-image": [[[],"ffffffff"]],"padding": [[[],"120462f3"]]},"MenuItem":{"color": [[[":hover"],"4a4a4a"],[[":disabled"],"cfcfcf"],[[],"0"]],"background-color": [[[":hover"],"f7e9da"],[[],"ffffffff"]],"background-image": [[[],"ffffffff"]],"opacity": [[[],"1.0"]]},"ProgressBar-Indicator":{"background-color": [[[":error"],"2020cb"],[[":paused"],"ebebeb"],[[],"9f5800"]],"background-image": [[[],"ffffffff"]],"border": [[[],"36a"]],"opacity": [[[],"1.0"]]},"ExpandItem":{"border": [[[],"dfa628db"]],"border-radius": []},"CCombo-Field":{"padding": [[[],"120462f3"]]},"Shell-MaxButton":{"margin": [[[":inactive"],"1203fd80"],[[],"1203fd80"]],"background-image": [[[":hover",":inactive",":maximized"],"af6f6914"],[[":inactive",":maximized"],"b215a2e5"],[[":hover",":maximized"],"af6f6914"],[[":hover",":inactive"],"7f9d166a"],[[":maximized"],"b215a2e5"],[[":inactive"],"ec0d88bb"],[[":hover"],"7f9d166a"],[[],"ec0d88bb"]]},"Spinner-UpButton-Icon":{"background-image": [[[":hover"],"d18fce93"],[[],"f7d3d3a4"]]}},true);
delete ts;
qx.io.Alias.getInstance().add( "static", "../org.eclipse.rap.rwt.q07/js/resource/static" );
qx.io.Alias.getInstance().add( "org.eclipse.swt", "../org.eclipse.rap.rwt.q07/js/resource" );