class ScrollSaver {
  value

  save() {
    this.value = window.scrollY
  }

  restore() {
    if (this.value) {
      window.scroll(0, this.value)
    }
  }
}

export default new ScrollSaver()
