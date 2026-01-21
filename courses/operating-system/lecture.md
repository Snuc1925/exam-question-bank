# Operating Systems

## What is an Operating System?

An operating system (OS) is system software that manages computer hardware and software resources and provides common services for computer programs.

## Key Components

### 1. Kernel
The core of the operating system:
- **Process Management**: Creating, scheduling, and terminating processes
- **Memory Management**: Allocating and deallocating memory
- **Device Drivers**: Interfacing with hardware
- **System Calls**: Interface between user programs and kernel

### 2. Process Management

#### Process States
```
New → Ready → Running → Waiting → Terminated
```

#### Process Scheduling
- **FCFS (First Come First Served)**: Simple but can cause convoy effect
- **SJF (Shortest Job First)**: Optimal average waiting time
- **Round Robin**: Fair time-sharing with time quantum
- **Priority Scheduling**: Based on process priority

### 3. Memory Management

#### Virtual Memory
- Allows programs to use more memory than physically available
- Uses paging and segmentation
- Benefits: Isolation, larger address space

#### Paging
- Divide memory into fixed-size pages
- Eliminates external fragmentation
- Uses page table for address translation

### 4. Deadlock

Four necessary conditions:
1. **Mutual Exclusion**: Resources cannot be shared
2. **Hold and Wait**: Process holds resources while waiting
3. **No Preemption**: Resources cannot be forcibly taken
4. **Circular Wait**: Circular chain of waiting processes

## Synchronization

### Critical Section Problem
```c
do {
    entry_section();
    // Critical section
    exit_section();
    // Remainder section
} while (true);
```

### Solutions
- **Mutex Locks**: Binary locks for mutual exclusion
- **Semaphores**: Counting synchronization primitive
- **Monitors**: High-level synchronization construct

## File Systems

See separate file_systems.md for detailed information.

## Common OS Examples

- **Windows**: Desktop and server OS by Microsoft
- **Linux**: Open-source Unix-like OS
- **macOS**: Apple's desktop operating system
- **Android**: Mobile OS based on Linux kernel
- **iOS**: Apple's mobile operating system
