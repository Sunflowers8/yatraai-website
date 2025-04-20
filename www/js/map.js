// Initialize Map
let map;
let userMarker;

function initMap() {
    // Default coordinates (Delhi)
    const defaultCoords = [28.6139, 77.2090];
    
    // Create map
    map = L.map('map-container').setView(defaultCoords, 13);
    
    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add marker
    userMarker = L.marker(defaultCoords, {
        icon: L.divIcon({
            className: 'user-marker',
            html: '<i class="fas fa-map-marker-alt"></i>',
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        })
    }).addTo(map)
    .bindPopup('Your current location')
    .openPopup();
    
    // Handle destination input
    const destinationInput = document.getElementById('destination-input');
    destinationInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const destination = destinationInput.value.trim();
            if (destination) {
                searchDestination(destination);
            }
        }
    });
    
    // Handle current location button
    document.querySelector('.current-location-btn').addEventListener('click', locateUser);
    
    // Try to locate user automatically
    locateUser();
}

// Locate user with geolocation
function locateUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userCoords = [position.coords.latitude, position.coords.longitude];
                map.setView(userCoords, 15);
                userMarker.setLatLng(userCoords)
                    .setPopupContent('Your current location')
                    .openPopup();
                
                // In a real app, you might reverse geocode to get address
                console.log('User located at:', userCoords);
            },
            (error) => {
                console.error('Geolocation error:', error);
                alert('Could not determine your location. Using default location.');
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    } else {
        alert('Geolocation is not supported by your browser');
    }
}

// Search for destination (simulated)
function searchDestination(query) {
    // In a real app, you would use a geocoding service
    console.log('Searching for:', query);
    
    // Simulate search results
    const results = [
        {
            name: `${query} (City Center)`,
            coords: [28.6139 + (Math.random() * 0.02 - 0.01), 77.2090 + (Math.random() * 0.02 - 0.01)],
            address: '123 Main St, New Delhi'
        },
        {
            name: `${query} (Shopping District)`,
            coords: [28.6139 + (Math.random() * 0.02 - 0.01), 77.2090 + (Math.random() * 0.02 - 0.01)],
            address: '456 Market Rd, New Delhi'
        }
    ];
    
    // Clear previous markers
    map.eachLayer(layer => {
        if (layer instanceof L.Marker && layer !== userMarker) {
            map.removeLayer(layer);
        }
    });
    
    // Add new markers
    results.forEach(result => {
        L.marker(result.coords)
            .addTo(map)
            .bindPopup(`
                <h4>${result.name}</h4>
                <p>${result.address}</p>
                <button class="map-popup-btn">Set Destination</button>
            `)
            .on('popupopen', () => {
                document.querySelector('.map-popup-btn').addEventListener('click', () => {
                    setDestination(result.coords, result.name);
                });
            });
    });
    
    // Show all results
    const group = new L.featureGroup(results.map(r => L.marker(r.coords)));
    map.fitBounds(group.getBounds().pad(0.2));
}

// Set destination
function setDestination(coords, name) {
    // In a real app, you would calculate route here
    console.log('Destination set:', name, coords);
    
    // Show route on map (simulated)
    if (window.routeLine) {
        map.removeLayer(window.routeLine);
    }
    
    const userLatLng = userMarker.getLatLng();
    window.routeLine = L.polyline([userLatLng, coords], {
        color: '#0F2B4B',
        weight: 4,
        dashArray: '5, 5'
    }).addTo(map);
    
    // Show destination marker
    if (window.destinationMarker) {
        map.removeLayer(window.destinationMarker);
    }
    
    window.destinationMarker = L.marker(coords, {
        icon: L.divIcon({
            className: 'destination-marker',
            html: '<i class="fas fa-map-marker-alt"></i>',
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        })
    }).addTo(map)
    .bindPopup(`<b>Destination:</b> ${name}`)
    .openPopup();
    
    // Close any open panels
    document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.remove('active');
    });
    overlay.classList.remove('active');
    
    // Show route options
    showQuickroutePanel();
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', initMap);