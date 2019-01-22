#!/usr/bin/env bash
path_portion="iecl-scheduler/client"
tcp_ports="3000"
kill_options="$@"

if [[ -n "${kill_options}" ]]; then
    echo "Using options for kill: ${kill_options}"
fi

echo

echo "Killing processes listening to tcp ports ${tcp_ports} ..."
for pid in $(lsof -i tcp:${tcp_ports} -t); do
    echo "  - killing pid ${pid}"
    kill ${kill_options} ${pid}
done
echo "...done"

echo "Killing node processes executing react-scripts-ts start"
for pid in $(ps | grep node | grep -v grep | grep "react-scripts-ts start" | grep "${path_portion}" | awk '{print $1;}'); do
    echo "  - killing pid ${pid}"
    kill ${kill_options} ${pid}
done
echo "...done"
