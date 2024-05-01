<?php

namespace App\Enums;

use Rexlabs\Enum\Enum;

/**
 * The UserRole enum.
 *
 * @method static self CANDIDATE()
 * @method static self ADMINISTRATOR()
 */
class UserRole extends Enum
{
    const CANDIDATE = 'candidate';
    const ADMINISTRATOR = 'administrator';
}
