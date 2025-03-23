### Steps

1. Refresh the page.
2. Find the country **G**
3. Choose sorting by **Europe**
4. Sort by **population** → **name**.
5. Perform sorting **Descending**
6. Visit the first 3 countries / highlight them.

---

### Updated Performance Analysis

- **Commit Duration (before/after):** X ms → Y ms
- **Render Duration (before/after):** A ms → B ms

  ![standart-sort](screen/standart-sort.png)
  ![standart-sort](screen/standart-sort1.png)

- **Flame Graph:** Components now take less time to render.
- **Interactions:** The number of unnecessary updates has decreased.
  Длительность фиксации: время, необходимое React для рендеринга зафиксированных обновлений.
  Длительность рендеринга: время, необходимое для рендеринга отдельных компонентов.
  Взаимодействия: взаимодействия пользователя, которые запускают рендеринг.
  График Flame: визуальное представление времени рендеринга компонентов.
  Ранжированная диаграмма: отсортированный список компонентов по длительности рендеринга.

добавил React.memo() в компонент SearchBar
до

после
