# File Systems

## Introduction to File Systems

A file system is a method and data structure that the operating system uses to control how data is stored and retrieved.

## Types of File Systems

### 1. FAT (File Allocation Table)
- Simple and widely supported
- Limited file size support
- Used in USB drives and memory cards

### 2. NTFS (New Technology File System)
- Advanced features like encryption and compression
- Better security and reliability
- Default for Windows systems

### 3. ext4 (Fourth Extended File System)
- Common in Linux systems
- Supports large files and volumes
- Journaling for data integrity

## Key Concepts

### Inodes
Inodes are data structures that store information about files and directories:
- File permissions
- Owner and group
- File size
- Timestamps
- Pointers to data blocks

### Directory Structure
```
root/
├── home/
│   ├── user1/
│   └── user2/
├── var/
│   ├── log/
│   └── tmp/
└── etc/
```

## File Operations

1. **Create**: Allocate new inode and data blocks
2. **Read**: Access data blocks using inode pointers
3. **Write**: Modify data blocks and update metadata
4. **Delete**: Mark inode and blocks as available

## Performance Considerations

- **Fragmentation**: Files scattered across disk
- **Caching**: Keep frequently accessed data in memory
- **Buffer**: Batch write operations for efficiency
