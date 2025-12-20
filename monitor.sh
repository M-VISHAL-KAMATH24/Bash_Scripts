#!/bin/bash
LOG_FILE="/home/visha/bashscripting/monitor.log"

echo "=== SYSTEM MONITOR STARTED - $(date) ===" | tee -a "$LOG_FILE"

while true; do
  clear
  echo "=== SYSTEM DASHBOARD - $(date +%H:%M:%S) ==="
  
  # FIXED CPU - remove decimal
  CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1 | cut -d',' -f1 | cut -d'.' -f1)
  echo "CPU:  $CPU%"
  
  # RAM Usage
  RAM=$(free -h | grep Mem | awk '{print $3 "/" $2}')
  echo "RAM:  $RAM"
  
  # Disk Usage (already integer)
  DISK=$(df -h / | tail -1 | awk '{print $5}' | sed 's/%//')
  echo "DISK: $DISK%"
  
  # FIXED Alerts - use integers only
  if [ "$CPU" -gt 80 ] 2>/dev/null || [ "$(echo "$CPU > 80" | bc)" -eq 1 ]; then
    echo "🚨 HIGH CPU ALERT!"
    echo "CPU CRITICAL: $CPU% - $(date)" >> "$LOG_FILE"
  fi
  
  if [ "$DISK" -gt 90 ]; then
    echo "💾 DISK FULL ALERT!"
    echo "DISK CRITICAL: $DISK% - $(date)" >> "$LOG_FILE"
  fi
  
  echo "----------------------------------------"
  sleep 5
done

