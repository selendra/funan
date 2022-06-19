import { Button as AntButton } from 'antd';

export default function Button({children, ...restProps}) {
  return <div {...restProps}>{children}</div>;
}

Button.Primary = function ButtonPrimary({children, medium, large, ...restProps}) {
  return (
    <AntButton
      {...restProps}
      className={`
        funan-btn funan-btnPrimary 
        ${medium && 'funan-btnPrimaryMedium'}
        ${large && 'funan-btnPrimaryLarge'}
      `}
    >{children}</AntButton>
  )
}

Button.Secondary = function ButtonSecondary({children, medium, large, ...restProps}) {
  return (
    <AntButton
      {...restProps}
      className={`
        funan-btn funan-btnSecondary
        ${medium && 'funan-btnSecondaryMedium'}
        ${large && 'funan-btnSecondaryLarge'}
      `}
    >{children}</AntButton>
  )
}

Button.Accent = function ButtonAccent({children, medium, ...restProps}) {
  return (
    <AntButton
      {...restProps}
      className={`
        funan-btn funan-btnAccent
        ${medium && 'funan-btnAccentMedium'}
      `}
    >{children}</AntButton>
  )
}

Button.Danger = function ButtonDanger({children, ...restProps}) {
  return (
    <AntButton
      {...restProps}
      className='funan-btnDanger'
    >{children}</AntButton>
  )
}

Button.Link = function ButtonLink({children, ...restProps}) {
  return (
    <AntButton
      {...restProps}
      type='link'
    >{children}</AntButton>
  )
}

Button.Outline = function ButtonOutline({children, primary, danger, ...restProps}) {
  return (
    <AntButton
      {...restProps}
      type='ghost'
      className={`
        funan-btn funan-btnOutline 
        ${primary && 'funan-btnOutlinePrimary'}
        ${danger && 'funan-btnOutlineDanger'}
      `}
    >{children}</AntButton>
  )
}