#!/bin/bash
BACKUP_DIR="/home/visha/backups"
REPORT_FILE="/home/visha/bashscripting/backup_report.txt"
mkdir -p "$BACKUP_DIR"

echo "=== BACKUP REPORT - $(date) ===" > "$REPORT_FILE"

# Backup logs (last 7 days)
echo "Backing up logs..." | tee -a "$REPORT_FILE"
find ~/bashscripting -name "*.log" -mtime -7 | tee backup_list.txt | tar -czf "$BACKUP_DIR/logs_$(date +%Y%m%d).tar.gz" -T -
echo "Logs backed up: $(wc -l < backup_list.txt) files" >> "$REPORT_FILE"
rm backup_list.txt

# Backup scripts
echo "Backing up scripts..." | tee -a "$REPORT_FILE"
find ~/bashscripting -name "*.sh" | tee backup_list.txt | tar -czf "$BACKUP_DIR/scripts_$(date +%Y%m%d).tar.gz" -T -
echo "Scripts backed up: $(wc -l < backup_list.txt) files" >> "$REPORT_FILE"
rm backup_list.txt

# Clean old backups (>7 days)
OLD_BACKUPS=$(find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 | wc -l)
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 -delete
echo "Deleted $OLD_BACKUPS old backups" >> "$REPORT_FILE"

echo "✅ Backup completed! Check: $REPORT_FILE"
