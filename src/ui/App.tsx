import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import { Modal } from '../ui/Modal'
import { CodeBlock } from './components/CodeBlock' // ✅ 追加

export default function App() {
  const [intents, setIntents] = useState<{ name: string; description: string }[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [schema, setSchema] = useState<any | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [result, setResult] = useState<any>(null)
  const [showModal, setShowModal] = useState(false) // ✅ モーダル表示

  // Intent一覧取得
  useEffect(() => {
    fetch('http://localhost:8787/intents')
      .then((res) => res.json())
      .then(setIntents)
  }, [])

  // Intentスキーマ取得
  useEffect(() => {
    if (!selected) return
    fetch(`http://localhost:8787/intents/${selected}/schema`)
      .then((res) => res.json())
      .then(setSchema)
  }, [selected])

  // Submit時Intent実行
  const handleSubmit = async ({ formData }: any) => {
    const res = await fetch(`http://localhost:8787/api/${selected}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const json = await res.json()
    setResult(json)
  }

  return (
    <div className="flex h-screen">
      <Sidebar intents={intents} onSelect={setSelected} />
      <main className="flex-1 p-6 space-y-4">
        {selected ? (
          <>
            <div className="text-lg font-medium">Selected: {selected}</div>

            {/* スキーマ可視化ボタン */}
            <button
              onClick={() => setShowModal(true)}
              className="mt-2 text-sm text-blue-600 underline"
            >
              View JSON Schema
            </button>

            {/* JSON Schema Form */}
            {schema?.parameters && (
              <div className="mt-6">
                <Form
                  schema={schema.parameters}
                  formData={formData}
                  onChange={(e) => setFormData(e.formData)}
                  onSubmit={handleSubmit}
                  validator={validator}
                />
              </div>
            )}

            {/* 結果表示 */}
            {result && (
  <div className="mt-4 bg-gray-100 p-4 rounded">
    <h3 className="font-semibold mb-2">Result</h3>
    <CodeBlock code={JSON.stringify(result, null, 2)} />
  </div>
)}

            {/* モーダル */}
            <Modal open={showModal} onOpenChange={setShowModal} title="Function Calling JSON">
  <CodeBlock code={JSON.stringify(schema, null, 2)} />
</Modal>
          </>
        ) : (
          <div>Pick an intent</div>
        )}
      </main>
    </div>
  )
}
