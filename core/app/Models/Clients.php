<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 *
 *
 * @property int $id
 * @property string $name
 * @property string $company
 * @property string $email
 * @property string $phone
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clients newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clients newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clients query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clients whereCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clients whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clients whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clients whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clients whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clients wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clients whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clients whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Clients extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'status',
        'company'
    ];
}
