var colors  = require( 'colors/safe' ),
    _       = require( 'underscore' );

require( 'shelljs/global' );

/**
 * Module
 *
 * @param  {Class} builder Gulp/Builder class/storage
 */
module.exports = function ( builder )
{
    var repeat = function ( s, n )
    {
        var a = [];

        while ( a.length < n )
        {
            a.push( s );
        }

        return a.join( '' );
    };

    var hasWhiteSpace = function ( s )
    {

        return /\s/g.test( s );
    };

    var getLength = function ( str )
    {
        str = str.toString();

        if ( hasWhiteSpace( str ) )
        {
            str = str.replace( ' ', '' );
        }

        return str.length;
    };

    var logBanner = function ( log, repeatFlag, themeColors )
    {
        var spacer      = ' ',
            maxLength   = 50,
            logLength   = getLength( log ),
            diff        = 0,
            output      = '';

        repeatFlag = repeatFlag || null;

        // parse log
        if ( _.isString( log ) )
        {
            output = log.toString().trim();
        }

        else if ( _.isBoolean( log ) )
        {
            output = log.toString();
        }

        else if ( _.isArray( log ) || _.isObject( log ) )
        {
            logLength = _.reduce( _.map( log, function ( s )
            {
                return getLength( s );
            } ), function ( m, n )
            {
                return m + n;
            } );

            if ( _.isArray( themeColors ) )
            {
                var tmpOutput = [];

                _.map( log, function ( s, k )
                {
                    if ( !themeColors[ k ] )
                    {
                        tmpOutput.push( s.trim() );
                        return;
                    }

                    tmpOutput.push( colors[ themeColors[ k ] ]( s.toString()
                        .trim() ) );
                } );

                output = tmpOutput.join( ' ' );
            }
            else
            {
                output = log.join( ' ' );
            }
        }

        // set base string diff
        diff = maxLength - logLength;

        // if repeat flag is set
        if ( repeatFlag && repeatFlag !== null )
        {
            spacer = output;

            if ( _.isBoolean( repeatFlag ) && repeatFlag === true )
            {
                diff = maxLength;
            }
            else if ( _.isNumber( repeatFlag ) )
            {
                diff = repeatFlag;
            }
            else
            {
                diff = maxLength - logLength;
            }
        }

        // console.log( logLength, diff, logLength + diff );

        console.log( colors.bgBlack.white( output + repeat( spacer, diff ) ) );
    };

    logBanner( ' ', true );
    logBanner( '-', true );
    logBanner( '4overScanner Webpack Build' );
    logBanner( '-', true );
    logBanner( ' ', true );

    // Repo
    // logBanner( [ 'Repo: ', '4over.com' ], null, [ 'bold', 'blue' ] );

    // Git Branch
    var branch = exec( 'git rev-parse --abbrev-ref HEAD',
        {
            silent: true
        } )
        .output;

    if ( branch )
    {
        logBanner( [ 'Branch: ', branch ], null, [ 'bold', 'blue' ] );
    }

    // Environment
    logBanner( [ 'Environment: ', builder.env ], null, [ 'bold', 'blue' ] );

    // Create Server
    logBanner( [ 'Running Server: ', builder.server ], null, [ 'bold', 'blue' ] );

    logBanner( ' ', true );
};
