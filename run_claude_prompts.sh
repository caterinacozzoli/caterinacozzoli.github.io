#!/bin/bash

# Esecuzione dei prompt 1-7 su portfolio-caterina
cd /Users/cate/Desktop/portfolio-caterina || exit 1
echo "=== Esecuzione Prompt 1-7 su portfolio-caterina ==="

for f in /Users/cate/Desktop/prompts/prompt-[1-7]-*.md; do
  if [ -f "$f" ]; then
    echo "Lancio Claude Code per: $f"
    claude -p "$(< "$f")"
  fi
done

# Esecuzione del prompt 8 su AbiliCity
echo "=== Esecuzione Prompt 8 su AbiliCity ==="
cd /Users/cate/Desktop/AbiliCity || exit 1
f="/Users/cate/Desktop/prompts/prompt-8-abilicity-handsome-frank.md"
if [ -f "$f" ]; then
  claude -p "$(< "$f")"
fi

# Ripresa Career Advisor (se possibile, o nuovo prompt)
echo "=== Ripresa Career Advisor ==="
claude -p "Riprendi la chat aperta integrata con career advisor e procedi."

echo "=== Automazione Completata ==="
