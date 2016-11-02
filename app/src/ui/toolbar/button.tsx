import * as React from 'react'
import { Octicon, OcticonSymbol } from '../octicons'
import * as classNames from 'classnames'

export interface IToolbarButtonProps {
  /** The primary button text, describing its function */
  readonly title: string,

  /** An optional description of the function of the button */
  readonly description?: string,

  /** An optional symbol to be displayed next to the button text */
  readonly icon?: OcticonSymbol,

  /**
   * An optional event handler for when the button is activated
   * by a pointer event or by hitting space/enter while focused.
   */
  readonly onClick?: () => void

  /**
   * An optional classname that will be appended to the default
   * class name 'toolbar-button'
   */
  readonly className?: string,

  readonly preContentRenderer?: () => JSX.Element | null
}

/**
 * A general purpose toolbar button
 */
export class ToolbarButton extends React.Component<IToolbarButtonProps, void> {

  public buttonElement: HTMLButtonElement | null = null

  private onClick() {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  public render() {
    const icon = this.props.icon
      ? <Octicon symbol={this.props.icon} className='icon' />
      : null

    const description = this.props.description
      ? <div className='description'>{this.props.description}</div>
      : null

    const className = classNames('toolbar-button', this.props.className)

    const preContentRenderer = this.props.preContentRenderer
    const preContent = preContentRenderer && preContentRenderer()

    return (
      <button
        className={className}
        onClick={(e) => this.onClick()}
        ref={(b) => this.buttonElement = b}>
        {preContent}
        <div className='toolbar-button-content-wrapper'>
          {icon}
          <div className='text'>
            <div className='title'>{this.props.title}</div>
            {description}
          </div>
          {this.props.children}
        </div>
      </button>
    )
  }
}
