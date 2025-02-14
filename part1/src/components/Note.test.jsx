import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    //使用了由react-testing-library提供的 render 函数来渲染组件
    render(<Note note={note} />)

    const element = screen.getByText('Component testing is done with react-testing-library')
    //使用Vitest的 expect 命令来检查元素的存在性
    expect(element).toBeDefined()
})