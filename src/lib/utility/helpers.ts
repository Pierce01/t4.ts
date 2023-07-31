export async function* batch(tasks: any[], limit: number, callback = (obj: any) => obj) {
  for (let i = 0; i < tasks.length; i = i + limit) {
    const batch = tasks.slice(i, i + limit)
    const result = await Promise.all(batch.map(task => callback(task)))
    yield result
  }
}

export async function batcher(tasks: any[], limit: number, timeout: any, callback: ((obj: any) => any) | undefined) {
  let results: any[] = []
  for await (const item of batch(tasks, limit, callback)) {
    results = results.concat(item)
    await wait(timeout)
  }
  return results
}

export function wait(ms: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), ms)
  })
}

export function chunk(items: any[], size: any) {  
  const chunks = []
  items = [].concat(...items)
  while (items.length) {
    chunks.push(items.splice(0, size))
  }
  return chunks
}