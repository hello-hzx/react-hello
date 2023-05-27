##  MobX区分了应用程序中的三个概念：
- State(状态)：定义 State 并使其**可观察**
- Actions(动作)：使用 Action **更新 State**
- Derivations(派生)：创建 Derivations 以便**自动对 State 变化进行响应**
  - 任何来源是State(状态) 并且不需要进一步交互的东西都是 Derivation(派生)。
    - Computed values，总是可以通过纯函数从当前的可观测 State 中派生。
    - Reactions，当 State 改变时需要自动运行的副作用 (命令式编程和响应式编程之间的桥梁)
## 创建可观察状态
- makeAutoObservable(target, annotations?, options?)
  - 所有 自有 属性都成为 observable。
  - 所有 getters 都成为 computed。
  - 所有 setters 都成为 action。 
  - 所有 prototype 中的 functions 都成为 autoAction。
  - 所有 prototype 中的 generator functions 都成为 flow。（需要注意，generators 函数在某些编译器配置中无法被检测到，如果 flow 没有正常运行，请务必明确地指定 flow 注解。）
  - 在 overrides 参数中标记为 false 的成员将不会被添加注解。例如，将其用于像标识符这样的只读字段。


- runInAction(fn)：创建一个会被立即调用的临时 action。在异步进程中非常有用。
