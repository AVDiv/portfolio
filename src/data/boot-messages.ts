interface BootMessage {
  message: string;
  sleep: number; // Sleep time in milliseconds
}

export const bootMessages: BootMessage[] = [
  {
    "message": "Linux version 6.1.0-21-amd64 (debian-kernel@lists.debian.org)",
    "sleep": 100
  },
  {
    "message": "Command line: BOOT_IMAGE=/vmlinuz root=/dev/sda1 ro quiet",
    "sleep": 5
  },
  {
    "message": "KERNEL supported cpus:",
    "sleep": 3
  },
  {
    "message": "  Intel GenuineIntel",
    "sleep": 1
  },
  {
    "message": "  AMD AuthenticAMD",
    "sleep": 1
  },
  {
    "message": "BIOS-provided physical RAM map:",
    "sleep": 40
  },
  {
    "message": "BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable",
    "sleep": 1
  },
  {
    "message": "BIOS-e820: [mem 0x000000000009fc00-0x000000000009ffff] reserved",
    "sleep": 1
  },
  {
    "message": "NX (Execute Disable) protection: active",
    "sleep": 2
  },
  {
    "message": "SMBIOS 3.0.0 present.",
    "sleep": 1
  },
  {
    "message": "DMI: System76 laptop/laptop, BIOS 1.07.07 03/17/2021",
    "sleep": 3
  },
  {
    "message": "tsc: Fast TSC calibration using PIT",
    "sleep": 2
  },
  {
    "message": "tsc: Detected 2399.996 MHz processor",
    "sleep": 1
  },
  {
    "message": "e820: update [mem 0x00000000-0x00000fff] usable ==> reserved",
    "sleep": 1
  },
  {
    "message": "e820: remove [mem 0x000a0000-0x000fffff] usable",
    "sleep": 1
  },
  {
    "message": "last_pfn = 0x430000 max_arch_pfn = 0x400000000",
    "sleep": 1
  },
  {
    "message": "x86/PAT: Configuration [0-7]: WB WC UC- UC WB WP UC- WT",
    "sleep": 2
  },
  {
    "message": "found SMP MP-table at [mem 0x000f00b0-0x000f00bf]",
    "sleep": 2
  },
  {
    "message": "RAMDISK: [mem 0x35f7b000-0x36d3afff]",
    "sleep": 1
  },
  {
    "message": "ACPI: Early table checksum verification disabled",
    "sleep": 2
  },
  {
    "message": "ACPI: RSDP 0x00000000000F0490 000024 (v02 PTLTD )",
    "sleep": 1
  },
  {
    "message": "ACPI: XSDT 0x00000000BFF75B7A 00009C (v01 PTLTD    XSDT   06040000  LTP 00000000)",
    "sleep": 2
  },
  {
    "message": "Zone ranges:",
    "sleep": 1
  },
  {
    "message": "  DMA      [mem 0x0000000000001000-0x0000000000ffffff]",
    "sleep": 1
  },
  {
    "message": "  DMA32    [mem 0x0000000001000000-0x00000000ffffffff]",
    "sleep": 1
  },
  {
    "message": "  Normal   [mem 0x0000000100000000-0x000000042fffffff]",
    "sleep": 1
  },
  {
    "message": "Movable zone start for each node",
    "sleep": 2
  },
  {
    "message": "Early memory node ranges",
    "sleep": 1
  },
  {
    "message": "  node   0: [mem 0x0000000000001000-0x000000000009efff]",
    "sleep": 1
  },
  {
    "message": "Initmem setup node 0 [mem 0x0000000000001000-0x000000000009efff]",
    "sleep": 1
  },
  {
    "message": "On node 0 totalpages: 16777216",
    "sleep": 1
  },
  {
    "message": "ACPI: PM-Timer IO Port: 0x408",
    "sleep": 20
  },
  {
    "message": "ACPI: LAPIC_NMI (acpi_id[0xff] high edge lint[0x1])",
    "sleep": 15
  },
  {
    "message": "IOAPIC[0]: apic_id 0, version 32, address 0xfec00000, GSI 0-23",
    "sleep": 20
  },
  {
    "message": "ACPI: INT_SRC_OVR (bus 0 bus_irq 0 global_irq 2 dfl dfl)",
    "sleep": 15
  },
  {
    "message": "Using ACPI (MADT) for SMP configuration information",
    "sleep": 20
  },
  {
    "message": "smpboot: Allowing 4 CPUs, 0 hotplug CPUs",
    "sleep": 15
  },
  {
    "message": "PM: hibernation image not present or could not be loaded.",
    "sleep": 20
  },
  {
    "message": "Memory: 16384000K/16777216K available (10240K kernel code, 1280K rwdata, 3584K rodata)",
    "sleep": 30
  },
  {
    "message": "SLUB: HWalign=64, Order=0-3, MinObjects=0, CPUs=4, Nodes=1",
    "sleep": 20
  },
  {
    "message": "Kernel/User page tables isolation: enabled",
    "sleep": 15
  },
  {
    "message": "ftrace: allocating 32768 entries in 128 pages",
    "sleep": 20
  },
  {
    "message": "rcu: Preemptible hierarchical RCU implementation.",
    "sleep": 15
  },
  {
    "message": "NMI watchdog: Enabled. Permanently consumes one hw-PMU counter.",
    "sleep": 20
  },
  {
    "message": "smp: Bringing up secondary CPUs ...",
    "sleep": 40
  },
  {
    "message": "x86: Booting SMP configuration:",
    "sleep": 20
  },
  {
    "message": ".... node  #0, CPUs:      #1 #2 #3",
    "sleep": 70
  },
  {
    "message": "smp: Brought up 1 node, 4 CPUs",
    "sleep": 20
  },
  {
    "message": "devtmpfs: initialized",
    "sleep": 15
  },
  {
    "message": "x86/mm: Memory block size: 128MB",
    "sleep": 20
  },
  {
    "message": "PM: Registering ACPI NVS region [mem 0xbfe00000-0xbfffffff] (2097152 bytes)",
    "sleep": 30
  },
  {
    "message": "clocksource: jiffies: mask: 0xffffffff max_cycles: 0xffffffff, max_idle_ns: 7645041785100000 ns",
    "sleep": 20
  },
  {
    "message": "futex hash table entries: 1024 (order: 4, 65536 bytes, linear)",
    "sleep": 15
  },
  {
    "message": "pinctrl core: initialized pinctrl subsystem",
    "sleep": 20
  },
  {
    "message": "NET: Registered protocol family 16",
    "sleep": 15
  },
  {
    "message": "DMA: preallocated 1024 KiB GFP_KERNEL pool for atomic allocations",
    "sleep": 20
  },
  {
    "message": "audit: initializing netlink subsys (disabled)",
    "sleep": 15
  },
  {
    "message": "thermal_sys: Registered thermal governor 'step_wise'",
    "sleep": 20
  },
  {
    "message": "cpuidle: using governor menu",
    "sleep": 15
  },
  {
    "message": "ACPI: bus type PCI registered",
    "sleep": 20
  },
  {
    "message": "PCI: MMCONFIG for domain 0000 [bus 00-3f] at [mem 0xf8000000-0xfbffffff] (base 0xf8000000)",
    "sleep": 25
  },
  {
    "message": "PCI: MMCONFIG at [mem 0xf8000000-0xfbffffff] reserved in E820",
    "sleep": 20
  },
  {
    "message": "PCI: Using configuration type 1 for base access",
    "sleep": 15
  },
  {
    "message": "HugeTLB registered 1.00 GiB page size, pre-allocated 0 pages",
    "sleep": 20
  },
  {
    "message": "HugeTLB registered 2.00 MiB page size, pre-allocated 0 pages",
    "sleep": 15
  },
  {
    "message": "ACPI: Added _OSI(Module Device)",
    "sleep": 20
  },
  {
    "message": "ACPI: Added _OSI(Processor Device)",
    "sleep": 15
  },
  {
    "message": "ACPI: Added _OSI(3.0 _SCP Extensions)",
    "sleep": 15
  },
  {
    "message": "ACPI: Added _OSI(Processor Aggregator Device)",
    "sleep": 15
  },
  {
    "message": "ACPI: 6 ACPI AML tables successfully acquired and loaded",
    "sleep": 25
  },
  {
    "message": "ACPI: EC: EC started",
    "sleep": 15
  },
  {
    "message": "ACPI: EC: interrupt blocked",
    "sleep": 15
  },
  {
    "message": "ACPI: \\_SB_.PCI0.LPCB.EC0_: Used as first EC",
    "sleep": 20
  },
  {
    "message": "ACPI: \\_SB_.PCI0.LPCB.EC0_: GPE 0x17 (level, enabled) for EC events",
    "sleep": 20
  },
  {
    "message": "ACPI: Dynamic OEM Table Load:",
    "sleep": 15
  },
  {
    "message": "ACPI: SSDT 0xFFFF88810004C000 0003D3 (v02 PmRef  Cpu0Cst  00003001 INTL 20160527)",
    "sleep": 25
  },
  {
    "message": "ACPI: Dynamic OEM Table Load:",
    "sleep": 15
  },
  {
    "message": "ACPI: SSDT 0xFFFF88810004D000 0005AA (v02 PmRef  ApIst    00003000 INTL 20160527)",
    "sleep": 20
  },
  {
    "message": "ACPI: Dynamic OEM Table Load:",
    "sleep": 15
  },
  {
    "message": "ACPI: SSDT 0xFFFF88810004F000 000119 (v02 PmRef  ApCst    00003000 INTL 20160527)",
    "sleep": 20
  },
  {
    "message": "ACPI: Interpreter enabled",
    "sleep": 15
  },
  {
    "message": "ACPI: (supports S0 S3 S4 S5)",
    "sleep": 15
  },
  {
    "message": "ACPI: Using IOAPIC for interrupt routing",
    "sleep": 20
  },
  {
    "message": "PCI: Using host bridge windows from ACPI; if necessary, use \"pci=nocrs\" and report a bug",
    "sleep": 25
  },
  {
    "message": "ACPI: Enabled 4 GPEs in block 00 to 1F",
    "sleep": 20
  },
  {
    "message": "input: PC Speaker as /devices/platform/pcspkr/input/input7",
    "sleep": 20
  },
  {
    "message": "intel_pstate: Intel P-state driver initializing",
    "sleep": 20
  },
  {
    "message": "ledtrig-cpu: registered to indicate activity on CPUs",
    "sleep": 20
  },
  {
    "message": "intel_pmc_core intel_pmc_core.0:  initialized",
    "sleep": 15
  },
  {
    "message": "drop_monitor: Initializing network drop monitor service",
    "sleep": 20
  },
  {
    "message": "NET: Registered protocol family 10",
    "sleep": 15
  },
  {
    "message": "Segment Routing with IPv6",
    "sleep": 15
  },
  {
    "message": "NET: Registered protocol family 17",
    "sleep": 20
  },
  {
    "message": "Key type dns_resolver registered",
    "sleep": 15
  },
  {
    "message": "microcode: sig=0x30673, pf=0x8, revision=0x32d",
    "sleep": 20
  },
  {
    "message": "microcode: Microcode Update Driver: v2.2.",
    "sleep": 15
  },
  {
    "message": "IPI shorthand broadcast: enabled",
    "sleep": 20
  },
  {
    "message": "sched_clock: Marking stable (5200000000, 23456)->(5223456000, 0)",
    "sleep": 20
  },
  {
    "message": "registered taskstats version 1",
    "sleep": 15
  },
  {
    "message": "Loading compiled-in X.509 certificates",
    "sleep": 20
  },
  {
    "message": "Loaded X.509 cert 'Debian Secure Boot CA: 6ccece7e4c6c0d1f6149f3dd27dfcc5cda5df8bd'",
    "sleep": 25
  },
  {
    "message": "Loaded X.509 cert 'Debian Secure Boot Signer 2022 - linux: 14011249c2675ea8e5148542202005810584b25f'",
    "sleep": 25
  },
  {
    "message": "zswap: loaded using pool lzo/zbud",
    "sleep": 20
  },
  {
    "message": "Key type ._fscrypt registered",
    "sleep": 15
  },
  {
    "message": "Key type .fscrypt registered",
    "sleep": 15
  },
  {
    "message": "Key type fscrypt-provisioning registered",
    "sleep": 20
  },
  {
    "message": "ata1: SATA link up 6.0 Gbps (SStatus 133 SControl 300)",
    "sleep": 40
  },
  {
    "message": "ata1.00: ATA-8: KINGSTON SA400S37240G, SBFK61D1, max UDMA/133",
    "sleep": 20
  },
  {
    "message": "ata1.00: 468862128 sectors, multi 1: LBA48 NCQ (depth 32), AA",
    "sleep": 20
  },
  {
    "message": "ata1.00: configured for UDMA/133",
    "sleep": 20
  },
  {
    "message": "scsi 0:0:0:0: Direct-Access     ATA      KINGSTON SA400S3 61D1 PQ: 0 ANSI: 5",
    "sleep": 25
  },
  {
    "message": "sd 0:0:0:0: [sda] 468862128 512-byte logical blocks: (240 GB/224 GiB)",
    "sleep": 20
  },
  {
    "message": "sd 0:0:0:0: [sda] Write Protect is off",
    "sleep": 15
  },
  {
    "message": "sd 0:0:0:0: [sda] Mode Sense: 00 3a 00 00",
    "sleep": 15
  },
  {
    "message": "sd 0:0:0:0: [sda] Write cache: enabled, read cache: enabled, doesn't support DPO or FUA",
    "sleep": 25
  },
  {
    "message": "sda: sda1 sda2 sda5",
    "sleep": 30
  },
  {
    "message": "sd 0:0:0:0: [sda] Attached SCSI disk",
    "sleep": 20
  },
  {
    "message": "ata2: SATA link down (SStatus 0 SControl 300)",
    "sleep": 20
  },
  {
    "message": "systemd[1]: Detected architecture x86-64.",
    "sleep": 15
  },
  {
    "message": "systemd[1]: Hostname set to <portfolio>.",
    "sleep": 20
  },
  {
    "message": "input: AT Translated Set 2 keyboard as /devices/platform/i8042/serio0/input/input4",
    "sleep": 20
  },
  {
    "message": "systemd[1]: Queued start job for default target Graphical Interface.",
    "sleep": 25
  },
  {
    "message": "systemd[1]: Created slice Slice /system/getty.",
    "sleep": 15
  },
  {
    "message": "systemd[1]: Created slice Slice /system/modprobe.",
    "sleep": 15
  },
  {
    "message": "systemd[1]: Created slice User and Session Slice.",
    "sleep": 15
  },
  {
    "message": "systemd[1]: Started Forward Password Requests to Wall Directory Watch.",
    "sleep": 20
  },
  {
    "message": "systemd[1]: Set up automount Arbitrary Executable File Formats File System Automount Point.",
    "sleep": 25
  },
  {
    "message": "systemd[1]: Reached target Local Encrypted Volumes.",
    "sleep": 15
  },
  {
    "message": "EXT4-fs (sda1): mounted filesystem with ordered data mode. Quota mode: none.",
    "sleep": 25
  },
  {
    "message": "usb 1-3: new high-speed USB device number 2 using xhci_hcd",
    "sleep": 30
  },
  {
    "message": "intel_rapl_msr: PL1 on die 0 locked by BIOS!",
    "sleep": 20
  },
  {
    "message": "cryptd: max_cpu_qlen set to 1000",
    "sleep": 15
  },
  {
    "message": "AVX2 version of gcm_enc/dec engaged.",
    "sleep": 20
  },
  {
    "message": "AES CTR mode by8 optimization enabled",
    "sleep": 20
  },
  {
    "message": "Adding 2097148k swap on /swapfile.  Priority:-2 extents:6 across:2260988k SSFS",
    "sleep": 25
  },
  {
    "message": "FAT-fs (sda2): Volume was not properly unmounted. Some data may be corrupt. Please run fsck.",
    "sleep": 30
  },
  {
    "message": "systemd[1]: Started Network Time Synchronization.",
    "sleep": 20
  },
  {
    "message": "systemd[1]: Started Network Manager.",
    "sleep": 20
  },
  {
    "message": "systemd[1]: Started CUPS Scheduler.",
    "sleep": 15
  },
  {
    "message": "systemd[1]: Started containerd container runtime.",
    "sleep": 20
  },
  {
    "message": "systemd[1]: Started Light Display Manager.",
    "sleep": 20
  },
  {
    "message": "systemd[1]: Reached target Graphical Interface.",
    "sleep": 15
  },
  {
    "message": "systemd[1]: Startup finished in 3.234s (kernel) + 6.278s (userspace) = 9.512s.",
    "sleep": 50
  },
  {
    "message": "NetworkManager[456]: <info>  [1752314634.534] NetworkManager (version 1.42.4) is starting... (for the first time)",
    "sleep": 20
  },
  {
    "message": "lightdm[789]: Starting Light Display Manager 1.26.0, UID=0 PID=789",
    "sleep": 20
  },
  {
    "message": "Portfolio system ready. Welcome!",
    "sleep": 100
  }
]