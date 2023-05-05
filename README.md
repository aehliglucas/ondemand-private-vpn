# Private OnDemand VPN
This project aims to provide an on-demand solution for VPN servers.
It is based on Ansible and Hetzner Cloud and should work following this schema:

### 1. Starting a new VPN server
Starting new VPN servers works via a simple web interface.
<br>The user logs in and can then select a location that the VPN should be located in (for now we ony support the US and Finland, as those are the only locations that Hetzner provides cloud servers in)
<br>All users are maintained by ourselves, as this is only meant for our own private use, as well as for some friends and family.

### 2. Ansible deploys a new Hetzner Cloud VM
During this step, Ansible creates a new Hetzner Cloud VM inside the desired VPN region and does some basic OS configuration steps.

### 3. Ansible installs WireGuard
In the third step, we install WireGuard on the mentioned VM and configure it.

### 4. Running post checks
To verify the correct installation of the WireGuard server, we run simple post checks using testinfra (pytest).
They check if all of the relevant config files on the WireGuard server are correct and ensure general reachability of the VM.

### 5. Download the WireGuard client config
The last step would be to download the actual WireGuard config that can be used on an end-device.
This should work from the web interface to make the user experience as convenient as possible. Although we are not sure about an exact way to implement this yet.
