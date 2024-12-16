import { $, type TemplateExpr } from "dax-sh"

export const i$ = (strings: TemplateStringsArray, ...exprs: TemplateExpr[]) => {
  return $(strings, ...exprs)
    .stdin("inherit")
    .stderr("inherit")
    .stdout("inherit")
}

export const v$ = (strings: TemplateStringsArray, ...exprs: TemplateExpr[]) => {
  return i$(strings, ...exprs).printCommand()
}
