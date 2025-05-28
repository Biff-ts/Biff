
import { Highlight, themes } from 'prism-react-renderer'

export function CodeBlock({ code }: { code: string }) {
  return (
    <Highlight theme={themes.nightOwl} code={code} language="json">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} p-4 text-xs rounded bg-gray-900 overflow-x-auto`} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
