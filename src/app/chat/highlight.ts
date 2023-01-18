import { HLJSApi, LanguageDetail } from "highlight.js"
import hljs from "highlight.js/lib/core"
// import { getLanguageFromAlias } from "./getLanguageFromAlias"
// import { importLanguage } from "./importLanguage"
// import { LANGUAGES } from "./languages"

const importRawLanguage = async (name: string) =>
    import(`highlight.js/lib/languages/${name}`).then(
        module => module.default as (hljs?: HLJSApi) => LanguageDetail,
    )

export const importLanguage = async (alias: string) => {
    const language = getLanguageFromAlias(alias)
    if (!language) return

    console.log(language)

    if (language.dependencies) {
        await Promise.all(
            language.dependencies.map(async dependency => {
                await importLanguage(dependency)
            }),
        )
    }

    hljs.registerLanguage(language.name, await importRawLanguage(language.name))

    if (typeof window !== "undefined") {
        console.log("Registered highlight.js language:", language.name)
    }
}


export const getLanguageFromAlias = (alias: string) => {
    for (const language of LANGUAGES) {
        if (language.name === alias || language.aliases?.includes(alias)) {
            return language
        }
    }
}

export const highlightCode = async (languageAlias: string, content: string) => {
    const language = getLanguageFromAlias(languageAlias)
    if (!language) return

    if (!hljs.getLanguage(language.name)) {
        await importLanguage(language.name)
    }

    return hljs.highlight(language.name, content).value
}

export type Language = {
    name: string
    aliases?: string[]
    dependencies?: string[]
}

export const LANGUAGES: Language[] = [
    { name: "1c" },
    { name: "abnf" },
    { name: "accesslog" },
    { name: "actionscript", aliases: ["as"] },
    { name: "ada" },
    { name: "angelscript", aliases: ["asc"] },
    { name: "apache", aliases: ["apacheconf"] },
    { name: "applescript", aliases: ["osascript"] },
    { name: "arcade" },
    { name: "arduino", aliases: ["ino"], dependencies: ["cpp"] },
    { name: "armasm", aliases: ["arm"] },
    { name: "asciidoc", aliases: ["adoc"], dependencies: ["xml"] },
    { name: "aspectj" },
    { name: "autohotkey", aliases: ["ahk"] },
    { name: "autoit" },
    { name: "avrasm" },
    { name: "awk" },
    { name: "axapta", aliases: ["x++"] },
    { name: "bash", aliases: ["sh", "zsh"] },
    { name: "basic" },
    { name: "bnf" },
    { name: "brainfuck", aliases: ["bf"] },
    { name: "c", aliases: ["h"], dependencies: ["c-like"] },
    {
        name: "c-like",
        aliases: ["c", "c++", "cc", "cxx", "h", "h++", "hh", "hpp", "hxx"],
    },
    { name: "cal" },
    { name: "capnproto", aliases: ["capnp"] },
    { name: "ceylon" },
    { name: "clean", aliases: ["dcl", "icl"] },
    { name: "clojure", aliases: ["clj"] },
    { name: "clojure-repl", dependencies: ["clojure"] },
    { name: "cmake", aliases: ["cmake.in"] },
    { name: "coffeescript", aliases: ["coffee", "cson", "iced"] },
    { name: "coq" },
    { name: "cos", aliases: ["cls"] },
    {
        name: "cpp",
        aliases: ["c++", "cc", "cxx", "h++", "hh", "hpp", "hxx"],
        dependencies: ["c-like"],
    },
    { name: "crmsh", aliases: ["crm", "pcmk"] },
    { name: "crystal", aliases: ["cr"] },
    { name: "csharp", aliases: ["c#", "cs"] },
    { name: "csp" },
    { name: "css" },
    { name: "d" },
    { name: "dart", dependencies: ["markdown"] },
    {
        name: "delphi",
        aliases: [
            "dfm",
            "dpr",
            "freepascal",
            "lazarus",
            "lfm",
            "lpr",
            "pas",
            "pascal",
        ],
    },
    { name: "diff", aliases: ["patch"] },
    { name: "django", aliases: ["jinja"], dependencies: ["xml"] },
    { name: "dns", aliases: ["bind", "zone"] },
    { name: "dockerfile", aliases: ["docker"], dependencies: ["bash"] },
    { name: "dos", aliases: ["bat", "cmd"] },
    { name: "dsconfig" },
    { name: "dts" },
    { name: "dust", aliases: ["dst"], dependencies: ["xml"] },
    { name: "ebnf" },
    { name: "elixir" },
    { name: "elm" },
    { name: "erb", dependencies: ["ruby", "xml"] },
    { name: "erlang", aliases: ["erl"] },
    { name: "erlang-repl" },
    { name: "excel", aliases: ["xls", "xlsx"] },
    { name: "fix" },
    { name: "flix" },
    { name: "fortran", aliases: ["f90", "f95"] },
    { name: "fsharp", aliases: ["fs"] },
    { name: "gams", aliases: ["gms"] },
    { name: "gauss", aliases: ["gss"] },
    { name: "gcode", aliases: ["nc"] },
    { name: "gherkin", aliases: ["feature"] },
    { name: "glsl" },
    { name: "gml" },
    { name: "go", aliases: ["golang"] },
    { name: "golo" },
    { name: "gradle" },
    { name: "groovy" },
    { name: "haml", dependencies: ["ruby"] },
    {
        name: "handlebars",
        aliases: ["hbs", "html.handlebars", "html.hbs", "htmlbars"],
        dependencies: ["xml"],
    },
    { name: "haskell", aliases: ["hs"] },
    { name: "haxe", aliases: ["hx"] },
    { name: "hsp" },
    { name: "htmlbars", aliases: ["hbs", "html.handlebars", "html.hbs"] },
    { name: "http", aliases: ["https"] },
    { name: "hy", aliases: ["hylang"] },
    { name: "inform7", aliases: ["i7"] },
    { name: "ini", aliases: ["toml"] },
    { name: "irpf90" },
    { name: "isbl" },
    { name: "java", aliases: ["jsp"] },
    { name: "javascript", aliases: ["cjs", "js", "jsx", "mjs"] },
    { name: "jboss-cli", aliases: ["wildfly-cli"] },
    { name: "json" },
    { name: "julia" },
    { name: "julia-repl", dependencies: ["julia"] },
    { name: "kotlin", aliases: ["kt"] },
    { name: "lasso", aliases: ["lassoscript", "ls"] },
    { name: "latex", aliases: ["tex"] },
    { name: "ldif" },
    { name: "leaf" },
    { name: "less" },
    { name: "lisp" },
    { name: "livecodeserver" },
    { name: "livescript", aliases: ["ls"] },
    { name: "llvm" },
    { name: "lsl" },
    { name: "lua" },
    { name: "makefile", aliases: ["mak", "mk"] },
    { name: "markdown", aliases: ["md", "mkd", "mkdown"], dependencies: ["xml"] },
    { name: "mathematica", aliases: ["mma", "wl"] },
    { name: "matlab" },
    { name: "maxima" },
    { name: "mel" },
    { name: "mercury", aliases: ["m", "moo"] },
    { name: "mipsasm", aliases: ["mips"] },
    { name: "mizar" },
    { name: "mojolicious", dependencies: ["perl", "xml"] },
    { name: "monkey" },
    { name: "moonscript", aliases: ["moon"] },
    { name: "n1ql" },
    { name: "nginx", aliases: ["nginxconf"] },
    { name: "nim" },
    { name: "nix", aliases: ["nixos"] },
    { name: "nsis" },
    {
        name: "objectivec",
        aliases: ["mm", "obj-c", "obj-c++", "objc", "objective-c++"],
    },
    { name: "ocaml", aliases: ["ml"] },
    { name: "openscad", aliases: ["scad"] },
    { name: "oxygene" },
    { name: "parser3", dependencies: ["xml"] },
    { name: "perl", aliases: ["pl", "pm"] },
    { name: "pf", aliases: ["pf.conf"] },
    { name: "pgsql", aliases: ["postgres", "postgresql"] },
    { name: "php", aliases: ["php3", "php4", "php5", "php6", "php7", "php8"] },
    { name: "php-template", dependencies: ["php", "xml"] },
    { name: "plaintext", aliases: ["text", "txt"] },
    { name: "pony" },
    { name: "powershell", aliases: ["ps", "ps1"] },
    { name: "processing" },
    { name: "profile" },
    { name: "prolog" },
    { name: "properties" },
    { name: "protobuf" },
    { name: "puppet", aliases: ["pp"] },
    { name: "purebasic", aliases: ["pb", "pbi"] },
    { name: "python", aliases: ["gyp", "ipython", "py"] },
    { name: "python-repl", aliases: ["pycon"], dependencies: ["python"] },
    { name: "q", aliases: ["k", "kdb"] },
    { name: "qml", aliases: ["qt"], dependencies: ["javascript", "xml"] },
    { name: "r" },
    { name: "reasonml", aliases: ["re"] },
    { name: "rib" },
    { name: "roboconf", aliases: ["graph", "instances"] },
    { name: "routeros", aliases: ["mikrotik"] },
    { name: "rsl" },
    { name: "ruby", aliases: ["gemspec", "irb", "podspec", "rb", "thor"] },
    { name: "ruleslanguage" },
    { name: "rust", aliases: ["rs"] },
    { name: "sas" },
    { name: "scala" },
    { name: "scheme" },
    { name: "scilab", aliases: ["sci"] },
    { name: "scss" },
    { name: "shell", aliases: ["console"], dependencies: ["bash"] },
    { name: "smali" },
    { name: "smalltalk", aliases: ["st"] },
    { name: "sml", aliases: ["ml"] },
    { name: "sqf" },
    { name: "sql" },
    { name: "stan", aliases: ["stanfuncs"] },
    { name: "stata", aliases: ["ado", "do"] },
    { name: "step21", aliases: ["p21", "step", "stp"] },
    { name: "stylus", aliases: ["styl"] },
    { name: "subunit" },
    { name: "swift" },
    { name: "taggerscript" },
    { name: "tap", dependencies: ["yaml"] },
    { name: "tcl", aliases: ["tk"] },
    { name: "thrift" },
    { name: "tp" },
    { name: "twig", aliases: ["craftcms"], dependencies: ["xml"] },
    { name: "typescript", aliases: ["ts"] },
    { name: "vala" },
    { name: "vbnet", aliases: ["vb"] },
    { name: "vbscript", aliases: ["vbs"] },
    { name: "vbscript-html", dependencies: ["vbscript", "xml"] },
    { name: "verilog", aliases: ["sv", "svh", "v"] },
    { name: "vhdl" },
    { name: "vim" },
    { name: "x86asm" },
    { name: "xl", aliases: ["tao"] },
    {
        name: "xml",
        aliases: [
            "atom",
            "html",
            "plist",
            "rss",
            "svg",
            "wsf",
            "xhtml",
            "xjb",
            "xsd",
            "xsl",
        ],
    },
    { name: "xquery", aliases: ["xpath", "xq"] },
    { name: "yaml", aliases: ["yml"], dependencies: ["ruby"] },
    { name: "zephir", aliases: ["zep"] },
]

