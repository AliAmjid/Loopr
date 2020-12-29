#!/bin/bash

	bin/console messenger:consume async --time-limit=3600
while sleep 3650; do
	bin/console messenger:consume async --time-limit=3600
done
