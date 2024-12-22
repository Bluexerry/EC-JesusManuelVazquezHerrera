import React from 'react';

const OptimizationEngine = ({ availableMembers, rolesRequired, levelCap, itemLevelCap, preferences, plannedStart, onOptimize }) => {

    const optimizeTeam = () => {
        // Filtrar miembros disponibles para el horario establecido
        const availableForSchedule = availableMembers.filter(member => {
            // Aquí puedes agregar la lógica para verificar la disponibilidad del miembro
            // Por ejemplo, si el miembro tiene un campo `availability` que indica su disponibilidad
            return true; // Asumimos que todos los miembros están disponibles para simplificar
        });

        // Filtrar miembros que cumplen con el Level Cap y Item Level Cap
        let eligibleMembers = availableForSchedule.filter(member => {
            return member.level <= levelCap && member.ilvl <= itemLevelCap;
        });

        // Crear una lista de miembros optimizada basada en las preferencias y roles requeridos
        const optimizedTeam = [];
        const roles = Object.keys(rolesRequired);

        roles.forEach(role => {
            const requiredCount = rolesRequired[role];
            const preferredMembers = eligibleMembers.filter(member => {
                return member.main_archetype === preferences.archetype || member.secondary_archetype === preferences.archetype;
            });

            const selectedMembers = preferredMembers.slice(0, requiredCount);
            optimizedTeam.push(...selectedMembers);

            // Remover los miembros seleccionados de la lista de elegibles
            eligibleMembers = eligibleMembers.filter(member => !selectedMembers.includes(member));
        });

        // Si no se llenaron todos los roles con las preferencias, llenar con los restantes elegibles
        roles.forEach(role => {
            const requiredCount = rolesRequired[role];
            const currentCount = optimizedTeam.filter(member => member.role === role).length;
            const remainingCount = requiredCount - currentCount;

            if (remainingCount > 0) {
                const remainingMembers = eligibleMembers.slice(0, remainingCount);
                optimizedTeam.push(...remainingMembers);

                // Remover los miembros seleccionados de la lista de elegibles
                eligibleMembers = eligibleMembers.filter(member => !remainingMembers.includes(member));
            }
        });

        onOptimize(optimizedTeam);
    };

    return (
        <div className="optimization-engine">
            <button onClick={optimizeTeam}>Optimize Team</button>
        </div>
    );
};

export default OptimizationEngine;