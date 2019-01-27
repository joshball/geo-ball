import { loadURL } from "./load-url"

test("loads from storybook", () => {
  const loadStub = jest.fn()
  loadURL({ loadURL: loadStub } as any, "a", "ui-renderer.html", true)
  expect(loadStub).toBeCalledWith("http://localhost:6006")
})

test("loads from electron", () => {
  const loadStub = jest.fn()
  loadURL({ loadURL: loadStub } as any, "a", "ui-renderer.html", false)
  if (process.platform === "win32") {
    expect(loadStub).toBeCalledWith("file:///a\\out\\ui-renderer.html")
  } else {
    expect(loadStub).toBeCalledWith("file:///a/out/ui-renderer.html")
  }
})
