#!/bin/bash
set -e
script_name=`basename "$0"`
# Prettify the console log - if running in interactive mode
RED=""
GREEN=""
CYAN=""
RESET=""
if [[ -t 1 ]]; then
  RED="$(tput setaf 1)"
  GREEN="$(tput setaf 2)"
  CYAN="$(tput setaf 6)"
  RESET="$(tput sgr0)"
fi
error() {
    echo "${RED}[ERROR]: ${RESET}$1" 1>&2;
    for var in "${@:2}"
    do
        echo "         ${var}" 1>&2;
    done
}
fail() {
  error "$@"
  exit 1
}
log() {
    echo "${CYAN}[INFO]:${RESET} $@"
}
