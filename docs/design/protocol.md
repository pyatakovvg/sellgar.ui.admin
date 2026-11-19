# Проектный Протокол

Protocol для non-trivial architecture или UX changes.

1. Определить owning package.
2. Изучить текущую implementation.
3. Проверить, есть ли уже local working pattern.
4. Описать target contract через routes, frames, controllers, data и UI-kit components.
5. Сделать минимальную implementation, которая удовлетворяет contract.
6. Проверить через build или browser evidence, если изменение влияет на runtime behavior.

Не начинать с broad refactor, если package-local fix достаточен.
