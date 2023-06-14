import { computed, ref, nextTick, reactive } from "vue";

export default function DynamicComponentComposable() {
  const activeComponentIndex = ref(0);
  const navigationHistory: Array<number> = reactive([0]);

  const navigationHistoryItemsCounts = computed(() => {
    return navigationHistory.length;
  });

  const indexOfLastNavigationItem = computed(() => {
    return navigationHistoryItemsCounts.value === 0
      ? 0
      : navigationHistoryItemsCounts.value - 1;
  });

  const handleNextSection = (): void => {
    activeComponentIndex.value += 1;
  };

  const handlePreviousSection = (): void => {
    if (activeComponentIndex.value === 0) return;
    activeComponentIndex.value -= 1;
  };

  const goBack = (): void => {
    if (navigationHistoryItemsCounts.value > 1) {
      navigationHistory.splice(indexOfLastNavigationItem.value, 1);

      // get the value of the last item in the array and set it as the active component index
      nextTick(() => {
        activeComponentIndex.value =
          navigationHistory[indexOfLastNavigationItem.value];
      });
    }
  };

  const setActiveComponentIndex = (componentIndex: number): void => {
    activeComponentIndex.value = componentIndex;
    //update the array that keeps track of the navigation history
    navigationHistory.push(componentIndex);
  };

  return {
    activeComponentIndex,
    navigationHistory,
    navigationHistoryItemsCounts,
    indexOfLastNavigationItem,
    handleNextSection,
    handlePreviousSection,
    goBack,
    setActiveComponentIndex,
  };
}
