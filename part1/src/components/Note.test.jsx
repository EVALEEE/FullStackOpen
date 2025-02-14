import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    //方法1:
    //使用了由react-testing-library提供的 render 函数来渲染组件
    render(<Note note={note} />)

    screen.debug()//可用于将组件的 HTML 打印到终端

    const element = screen.getByText('Component testing is done with react-testing-library')

    screen.debug(element)

    //使用Vitest的 expect 命令来检查元素的存在性
    expect(element).toBeDefined()

    //=====================================================

    //方法2:
    // const { container } = render(<Note note={note} />)

    // const div = container.querySelector('.note')
    // expect(div).toHaveTextContent(
    //     'Component testing is done with react-testing-library'
    // )
})

test('clicking the button calls event handler once', async () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    const mockHandler = vi.fn()//事件处理程序是一个使用 Vitest 定义的 mock 函数

    render(
        <Note note={note} toggleImportance={mockHandler} />
    )

    const user = userEvent.setup()//session 启动以与呈现的组件进行交互
    
    //测试基于呈现组件的文本找到按钮并单击元素
    const button = screen.getByText('make not important')
    //单击使用 userEvent 库的 click 方法进行
    await user.click(button)

    //测试的期望使用 toHaveLength 来验证mock 函数已被调用一次
    expect(mockHandler.mock.calls).toHaveLength(1)
})