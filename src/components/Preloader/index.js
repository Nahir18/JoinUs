import React from "react"
import { PreloaderContainer, Preloader, Text } from "./styles"

const PreloaderIcon = () => (
  <PreloaderContainer>
    <Preloader>
      <div className="item" />
      <div className="item" />
      <div className="item" />
      <div className="item" />
      <div className="item" />
      <div className="item" />
      <div className="item" />
      <div className="item" />
      <div className="item" />
      <div className="item" />
    </Preloader>
    <Text className="color-greyDarken j-c-center">
      Загрузка...
    </Text>
  </PreloaderContainer>
)

export default PreloaderIcon
