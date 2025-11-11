export const getWasteTypeStyle = (tipo) => {
    const tipoLower = tipo.toLowerCase();

    if (tipoLower.includes('plastic') || tipoLower.includes('plastico') || tipoLower.includes('bottle') || tipoLower.includes('botella')) {
        return { icon: 'reload-circle', color: '#3498db', backgroundColor: '#f0f9ff' };
    }
    if (tipoLower.includes('paper') || tipoLower.includes('papel') || tipoLower.includes('cardboard') || tipoLower.includes('carton')) {
        return { icon: 'document', color: '#3498db', backgroundColor: '#f0f9ff' };
    }
    if (tipoLower.includes('glass') || tipoLower.includes('vidrio')) {
        return { icon: 'wine', color: '#3498db', backgroundColor: '#f0f9ff' };
    }
    if (tipoLower.includes('metal') || tipoLower.includes('can') || tipoLower.includes('lata')) {
        return { icon: 'construct', color: '#3498db', backgroundColor: '#f0f9ff' };
    }

    if (tipoLower.includes('organic') || tipoLower.includes('organico') || tipoLower.includes('compost') || tipoLower.includes('food') || tipoLower.includes('comida')) {
        return { icon: 'leaf', color: '#2ecc71', backgroundColor: '#f0fff0' };
    }

    if (tipoLower.includes('battery') || tipoLower.includes('bateria') || tipoLower.includes('hazardous') || tipoLower.includes('peligroso')) {
        return { icon: 'warning', color: '#e74c3c', backgroundColor: '#fff0f0' };
    }

    return { icon: 'trash', color: '#95a5a6', backgroundColor: '#f0f0f0' };
};

export const formatTimeAgo = (fechaClasificacion) => {
    const now = new Date();
    const scanDate = new Date(fechaClasificacion);
    const diffMs = now - scanDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Justo ahora';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;

    return scanDate.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
};