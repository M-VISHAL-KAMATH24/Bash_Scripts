#!/bin/bash
log_dir="/home/visha/bashscripting"
app_log="application.log"
sys_log="system.log"
ERROR_PATTERNS=("ERROR" "CRITICAL")
REPORT_FILE="/home/visha/bashscripting/log_analysis_report.txt"

echo "analysis log files" > "$REPORT_FILE"
echo "**********************" >>"$REPORT_FILE"

echo -e "\nlist of the log files updatd within the 24 hours" >>"$REPORT_FILE"
LOG_FILES=$(find $log_dir -name "*.log" -mtime -1)
echo $LOG_FILES >>"$REPORT_FILE"

for LOG_FILE in $LOG_FILES;do
    for PATTERN in ${ERROR_PATTERNS[@]};do
        echo -e "\nsearching $PATTERN in the $LOG_FILE FILE" >>"$REPORT_FILE"
        grep "$PATTERN" "$LOG_FILE" >>"$REPORT_FILE"

        echo -e "\nnumber of $PATTERN in  $LOG_FILE FILE" >>"$REPORT_FILE"
        grep -c $PATTERN "$LOG_FILE" >>"$REPORT_FILE"
        echo "===========================" >>"$REPORT_FILE"
        echo "Yes the process is done" >>"$REPORT_FILE"
    done
done

echo -e "\n log analysis completed and report saved in $REPORT_FILE"