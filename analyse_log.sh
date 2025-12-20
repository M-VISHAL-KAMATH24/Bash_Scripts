#!/bin/bash
log_dir="/home/visha/bashscripting"
app_log="application.log"
sys_log="system.log"
ERROR_PATTERNS=("ERROR" "CRITICAL")
echo "analysis log files"
echo "**********************"

echo -e "\nlist of the log files updatd within the 24 hours"
LOG_FILES=$(find $log_dir -name "*.log" -mtime -1)
echo $LOG_FILES


    echo -e "\nsearching errros in the application logs"
    grep "${ERROR_PATTERNS[0]}" "$log_dir/$app_log"

    echo -e "\nnumber of erros in application logs"
    grep -c "${ERROR_PATTERNS[0]}" "$log_dir/$app_log"


    echo -e "\nerror in the system logs"
    grep "${ERROR_PATTERNS[0]}" "$log_dir/$sys_log"

    echo -e "\ncritical factor to consider in the system"
    grep "${ERROR_PATTERNS[1]}" "$log_dir/$sys_log"

    echo "==========================="
    echo "Yes the process is done"
