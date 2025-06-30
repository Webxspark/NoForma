<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 *
 *
 * @property int $id
 * @property int $client_id
 * @property string $ai_summary
 * @property string $requirements
 * @property string $requirement_summary
 * @property string $notes
 * @property string $suggestions
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Moms newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Moms newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Moms query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Moms whereAiSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Moms whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Moms whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Moms whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Moms whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Moms whereRequirementSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Moms whereRequirements($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Moms whereSuggestions($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Moms whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Moms extends Model
{
    protected $fillable = [
        'client_id',
        'ai_summary',
        'requirements',
        'requirement_summary',
        'notes',
        'suggestions',
        'status'
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Clients::class, 'client_id');
    }
}
