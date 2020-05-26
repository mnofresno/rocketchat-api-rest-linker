#!/bin/bash
source ./credentials.conf
payload=$(echo "$1" |base64 -d)
finalUrl="${rocketChatUrl}/api/v1/chat.postMessage"
curl -X POST $finalUrl -d "${payload}" -H "Content-Type:application/json" -H "X-Auth-Token:$token" -H "X-User-Id:$userId"