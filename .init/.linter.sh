#!/bin/bash
cd /home/kavia/workspace/code-generation/orange-bookstore-90836-90845/book_store_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

