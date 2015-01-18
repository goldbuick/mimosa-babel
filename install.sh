#!/bin/bash
set -o verbose
set -x

ORIG="$PWD"

rm -rf node_modules
cd ..
dir=`mktemp -d` && cd $dir
npm install mimosa-6to5
mv node_modules "$ORIG"
cd "$ORIG"
rm -rf "$dir"