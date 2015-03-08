#!/bin/bash -e

# @credit http://stackoverflow.com/a/246128/330439
SOURCE="${BASH_SOURCE[0]:-$0}"
while [ -h "$SOURCE" ]; do
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
BASE_PATH="$( cd -P "$( dirname "$SOURCE" )" && pwd )"


_OLD_PATH=`pwd`
cd $BASE_PATH;

cd client; ../node_modules/.bin/pinf bundle; cd ..
cd server; ../node_modules/.bin/pinf bundle; cd ..

cd "$_OLD_PATH"
