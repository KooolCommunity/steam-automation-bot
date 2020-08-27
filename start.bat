@echo off
color 0c
type title.txt
timeout 5
cls
color 0f
type title.txt
echo Signing into Steam with provied information in config.json
node bot.js
cls
color 0c
echo An unexpected error caused the bot to crash.
pause                                                        