import { render, screen } from '@testing-library/react'
import Footer from './Footer'

it('renders footer text', () => {
    render(<Footer />)
    expect(screen.getByText('fvd2.xyz 2021 - all rights reserved')).toBeInTheDocument()
})