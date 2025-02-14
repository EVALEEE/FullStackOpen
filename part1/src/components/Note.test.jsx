import { render, screen } from '@testing-library/react'
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