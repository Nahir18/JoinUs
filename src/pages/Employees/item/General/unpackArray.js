import React, {useMemo} from "react";

export default (OriginalComponent) => ({value, ...props}) => {
  const getDate = useMemo(() => {
    if (value && value.length > 0 && Array.isArray(value)) {
      return value[0]
    } else {
      return value
    }
  }, [value])
  return (
    <OriginalComponent
      {...props}
      value={getDate}
    />
  )
}
