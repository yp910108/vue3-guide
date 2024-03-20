<template>
  <li class="custom-list-item" @click="handleItemClick(item)">
    <span class="custom-list-item__header">
      <slot name="header">{{ item.title }}</slot>
    </span>
    <div class="custom-list-item__content">
      <slot>{{ item.content }}</slot>
    </div>
    <div class="custom-list-item__footer">
      <slot name="footer"></slot>
    </div>
  </li>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    handleItemClick() {
      this.$emit('item-click', this.item)
    }
  }
}
</script>

<style lang="scss">
.custom-list-item {
  position: relative;
  margin: 0 !important;
  padding: 10px 20px;
  border-radius: 3px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f5;
  }
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: #efefef;
  }
  &:last-child::after {
    display: none;
  }
  .custom-list-item__header {
    font-weight: bold;
    font-size: 16px;
  }
  .custom-list-item__content {
    margin: 10px 0;
    font-size: 14px;
  }
  .custom-list-item__footer {
    font-size: 14px;
  }
}
</style>
